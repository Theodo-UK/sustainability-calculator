import { useEffect, useState } from "react";
import { CountryName } from "../../data/constants/CountryEmissions";
import { calculateAverageSpecificEmissionsHelper } from "./__tests__/calculateAverageSpecificEmissions";
import { calculateCarbon } from "./utils/calculateCarbon";
import { ISelectedCountriesRepository } from "../../data/selected-countries/ISelectedCountriesRepository";
import { useMountEffect } from "./useOnceAfterFirstMount";
import {
    CalculationDataType,
    ICalculationsRepository,
} from "../../data/calculations/ICalculationsRepository";
import { refreshActiveTabAndRecordBytes } from "./utils/refreshActiveTabAndRecordBytes";
import { backgroundStopRecordingBytes } from "./utils/backgroundStopRecordingBytes";

export const usePopup = () => {
    const selectedCountriesRepository: ISelectedCountriesRepository =
        ISelectedCountriesRepository.instance;
    const calculationsRepository: ICalculationsRepository =
        ICalculationsRepository.instance;

    const [bytesTransferred, setBytesTransferred] = useState(0);
    const [emissions, setEmissions] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<
        Map<CountryName, number>
    >(new Map<CountryName, number>());
    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [error, setError] = useState<string>();
    const [calculationHistory, setCalculationHistory] = useState<
        CalculationDataType[]
    >([]);

    const refreshCalculationHistory = async () => {
        const calculationsData =
            await calculationsRepository.getAllCalculations();
        setCalculationHistory(calculationsData);
    };

    const setCountryPercentage = async (
        country: CountryName,
        percentage: number
    ) => {
        await selectedCountriesRepository.setSelectedCountryPercentage(
            country,
            percentage
        );
        const newMap =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newMap);
    };

    const sumPercentages = () => {
        const percentage = Array.from(selectedCountries.values()).reduce(
            (accumulator, country) => {
                return accumulator + country;
            },
            0
        );

        if (percentage > 1) {
            throw new Error(
                `Error: The sum of the percentages is greater than 100%. Current sum: ${
                    percentage * 100
                }%`
            );
        }

        return percentage;
    };

    const refreshAndGetSize = async (bypassCache: boolean) => {
        try {
            sumPercentages();
            setAverageSpecificEmissions(
                calculateAverageSpecificEmissionsHelper(selectedCountries)
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        try {
            await calculationsRepository.setOngoingCalculation(true);
            backgroundStopRecordingBytes();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        setError(undefined);
        refreshActiveTabAndRecordBytes(bypassCache);
    };

    const stopRecording = () => {
        backgroundStopRecordingBytes();
        try {
            calculationsRepository.storeCalculation({
                bytes: bytesTransferred,
                emissions: emissions,
                specificEmissions: averageSpecificEmissions,
                selectedCountries: selectedCountries,
                unixTimeMs: Date.now(),
            });
            calculationsRepository.setOngoingCalculation(false);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    const addSelectedCountry = async (country: CountryName) => {
        await selectedCountriesRepository.addSelectedCountry(country);
        const newMap =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newMap);
    };

    const removeSelectedCountry = async (country: CountryName) => {
        await selectedCountriesRepository.removeSelectedCountry(country);
        const newMap =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newMap);
    };

    useEffect(() => {
        const bytesTransferredChangedListener = (
            message: { command: { bytesTransferredChanged: number } },
            sender: chrome.runtime.MessageSender,
            sendResponse: (response?: boolean) => void
        ) => {
            if (message.command.bytesTransferredChanged) {
                const _bytes = message.command.bytesTransferredChanged;
                setBytesTransferred(_bytes);
                const _emissions = calculateCarbon(_bytes, selectedCountries);
                setEmissions(_emissions);
            }
            sendResponse(true);
            return true;
        };

        chrome.runtime.onMessage.addListener(bytesTransferredChangedListener);

        return () => {
            chrome.runtime.onMessage.removeListener(
                bytesTransferredChangedListener
            );
        };
    }, [selectedCountries]);

    useMountEffect(() => {
        const getLastCalculationAndSetState = async () => {
            const _selectedCountries =
                await selectedCountriesRepository.getSelectedCountriesAndPercentages();
            setSelectedCountries(_selectedCountries);

            if (await calculationsRepository.isOngoingCalculation()) {
                const _bytes = await chrome.runtime.sendMessage(
                    "getBytesTransferred"
                );

                setBytesTransferred(_bytes);
                setEmissions(calculateCarbon(_bytes, _selectedCountries));
                setAverageSpecificEmissions(
                    calculateAverageSpecificEmissionsHelper(_selectedCountries)
                );
                return;
            }

            const calculationData =
                await calculationsRepository.getLastCalculation();
            if (!(calculationData === null)) {
                setBytesTransferred(calculationData.bytes);
                setEmissions(calculationData.emissions);
                setAverageSpecificEmissions(calculationData.specificEmissions);
                return;
            }

            setBytesTransferred(0);
            setEmissions(0);
            setAverageSpecificEmissions(0);
        };
        getLastCalculationAndSetState();
    });

    return {
        emissions,
        bytesTransferred,
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        stopRecording,
        calculationHistory,
        refreshCalculationHistory,
        error,
    };
};
