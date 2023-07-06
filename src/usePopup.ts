import { useEffect, useState } from "react";
import { CountryName } from "./constants/Countries";
import { calculateAverageSpecificEmissionsHelper } from "./helpers/calculateAverageSpecificEmissions";
import { calculateCarbon } from "./helpers/calculateCarbon";
import { ISelectedCountriesRepository } from "./data/selected_countries/ISelectedCountriesRepository";
import { useMountEffect } from "./helpers/useOnceAfterFirstMount";
import { ICalculationsRepository } from "./data/calculations/ICalculationsRepository";
import { IBytesRepository } from "./data/bytes/IBytesRepository";

export const usePopup = () => {
    const selectedCountriesRepository: ISelectedCountriesRepository =
        ISelectedCountriesRepository.instance;
    const calculationsRepository: ICalculationsRepository =
        ICalculationsRepository.instance;
    const bytesRepository: IBytesRepository = IBytesRepository.instance;

    const [totalBytesTransferred, settotalBytesTransferred] = useState(0);
    const [emissions, setEmissions] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<
        Map<CountryName, number>
    >(new Map<CountryName, number>());
    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [error, setError] = useState<string>();

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

    const calculateAverageSpecificEmissions = () => {
        const newAverageSpecificEmissions =
            calculateAverageSpecificEmissionsHelper(selectedCountries);
        setAverageSpecificEmissions(newAverageSpecificEmissions);
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
            calculateAverageSpecificEmissions();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        try {
            await bytesRepository.clearTotalBytesTransferred();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        setError(undefined);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tabId = tabs[0].id;
                if (tabId) {
                    chrome.tabs.reload(
                        tabId,
                        {
                            bypassCache: bypassCache,
                        },
                        () => {
                            chrome.runtime.sendMessage({
                                command: "startStoringWebRequestPayloadSize",
                                tabId,
                            });
                        }
                    );
                }
            }
        });
    };

    const stopRecording = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tabId = tabs[0].id;
                if (tabId) {
                    chrome.runtime.sendMessage({
                        command: "stopStoringWebRequestPayloadSize",
                        tabId,
                    });
                }
            }
        });
        calculationsRepository.storeCalculation({
            bytes: totalBytesTransferred,
            emissions: emissions,
            specificEmissions: averageSpecificEmissions,
            selectedCountries: selectedCountries,
        });
        calculationsRepository.clearOngoingCalculation();
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
        const totalBytesTransferredListener = (changes: {
            [key: string]: chrome.storage.StorageChange;
        }) => {
            if (changes.totalBytesTransferred) {
                settotalBytesTransferred(
                    changes.totalBytesTransferred.newValue
                );
                const _emissions = calculateCarbon(
                    changes.totalBytesTransferred.newValue,
                    selectedCountries
                );
                setEmissions(_emissions);
                calculationsRepository.cacheOngoingCalculation({
                    bytes: changes.totalBytesTransferred.newValue,
                    emissions: _emissions,
                    specificEmissions: averageSpecificEmissions,
                    selectedCountries: selectedCountries,
                });
            }
        };

        chrome.storage.local.onChanged.addListener(
            totalBytesTransferredListener
        );

        return () => {
            chrome.storage.local.onChanged.removeListener(
                totalBytesTransferredListener
            );
        };
    }, [selectedCountries, averageSpecificEmissions, calculationsRepository]);

    useMountEffect(() => {
        selectedCountriesRepository
            .getSelectedCountriesAndPercentages()
            .then((newMap) => {
                setSelectedCountries(newMap);
            });
    });

    useMountEffect(() => {
        calculationsRepository.getLastCalculation().then((calculationData) => {
            settotalBytesTransferred(calculationData?.bytes ?? 0);
            setEmissions(calculationData?.emissions ?? 0);
            setAverageSpecificEmissions(
                calculationData?.specificEmissions ?? 0
            );
        });
    });

    return {
        emissions,
        totalBytesTransferred,
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        stopRecording,
        error,
    };
};
