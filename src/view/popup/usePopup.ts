import { useEffect, useState } from "react";
import {
    CalculationDataType,
    ICalculationsRepository,
    UserType,
} from "../../data/calculations/ICalculationsRepository";
import { CountryName } from "../../data/constants/CountryEmissions";
import { DeviceName } from "../../data/constants/DeviceEmissions";
import { ISelectedCountriesRepository } from "../../data/selected-countries/ISelectedCountriesRepository";
import { ISelectedDevicesRepository } from "../../data/selected-devices/ISelectedDevicesRepository";
import { IStorageRepository } from "../../data/storage/IStorageRepository";
import { useMountEffect } from "./useOnceAfterFirstMount";
import { backgroundStopRecordingBytes } from "./utils/backgroundStopRecordingBytes";
import {
    calculateEmissionsFromBytes,
    calculateEmissionsFromFlowTime,
} from "./utils/calculateCarbon";
import { refreshActiveTabAndRecordBytes } from "./utils/refreshActiveTabAndRecordBytes";
export const usePopup = () => {
    console.log(IStorageRepository.instance.get(null));
    const selectedCountriesRepository: ISelectedCountriesRepository =
        ISelectedCountriesRepository.instance;
    const selectedDevicesRepository: ISelectedDevicesRepository =
        ISelectedDevicesRepository.instance;
    const calculationsRepository: ICalculationsRepository =
        ICalculationsRepository.instance;

    const [bytesTransferred, setBytesTransferred] = useState(0);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [flowTime, setFlowTime] = useState(0);
    const [emissions, setEmissions] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<
        Map<CountryName, number>
    >(new Map<CountryName, number>());
    const [selectedDevices, setSelectedDevices] = useState<
        Map<DeviceName, number>
    >(new Map<CountryName, number>());
    const [error, setError] = useState<string>();
    const [calculationHistory, setCalculationHistory] = useState<
        CalculationDataType[]
    >([]);
    const [userType, setUserType] = useState<UserType>("new user");

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

    const setDevicePercentage = async (
        device: DeviceName,
        percentage: number
    ) => {
        await selectedDevicesRepository.setSelectedDevicePercentage(
            device,
            percentage
        );
        const newMap =
            await selectedDevicesRepository.getSelectedDevicesAndPercentages();
        setSelectedDevices(newMap);
    };

    const sumPercentages = (selectedElements: Map<string, number>) => {
        const percentage = Array.from(selectedElements.values()).reduce(
            (accumulator, element) => {
                return accumulator + element;
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

    const refreshAndGetSize = async () => {
        try {
            sumPercentages(selectedCountries);
            sumPercentages(selectedDevices);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        try {
            await calculationsRepository.setOngoingCalculation(true);
            setStartTime(Date.now());
            setFlowTime(startTime - Date.now());
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        setError(undefined);
        refreshActiveTabAndRecordBytes(userType === "new user");
    };

    const stopRecording = async (): Promise<void> => {
        backgroundStopRecordingBytes();
        setFlowTime(startTime - Date.now());
        try {
            await calculationsRepository.storeCalculation({
                bytes: bytesTransferred,
                flowTime: flowTime,
                selectedCountries: selectedCountries,
                selectedDevices: selectedDevices,
                unixTimeMs: Date.now(),
                userType: userType,
            });
            await calculationsRepository.setOngoingCalculation(false);
            await refreshCalculationHistory();
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

    const addSelectedDevice = async (device: DeviceName) => {
        await selectedDevicesRepository.addSelectedDevice(device);
        const newMap =
            await selectedDevicesRepository.getSelectedDevicesAndPercentages();
        setSelectedDevices(newMap);
    };

    const removeSelectedDevice = async (device: DeviceName) => {
        await selectedDevicesRepository.removeSelectedDevice(device);
        const newMap =
            await selectedDevicesRepository.getSelectedDevicesAndPercentages();
        setSelectedDevices(newMap);
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
                const _emissions =
                    calculateEmissionsFromBytes(_bytes, selectedCountries) +
                    calculateEmissionsFromFlowTime(_bytes, selectedDevices);
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
    }, [selectedCountries, selectedDevices]);

    useMountEffect(() => {
        const getLastCalculationAndSetState = async () => {
            const _selectedCountries =
                await selectedCountriesRepository.getSelectedCountriesAndPercentages();
            const _selectedDevices =
                await selectedDevicesRepository.getSelectedDevicesAndPercentages();
            setSelectedCountries(_selectedCountries);
            setSelectedDevices(_selectedDevices);

            if (await calculationsRepository.isOngoingCalculation()) {
                const _bytes = await chrome.runtime.sendMessage(
                    "getBytesTransferred"
                );

                setBytesTransferred(_bytes);
                setEmissions(
                    calculateEmissionsFromBytes(_bytes, _selectedCountries)
                );
                return;
            }

            const calculationData =
                await calculationsRepository.getLastCalculation();
            if (!(calculationData === null)) {
                setBytesTransferred(calculationData.bytes);
                return;
            }

            setBytesTransferred(0);
            setFlowTime(0);
            setEmissions(0);
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
        selectedDevices,
        addSelectedDevice,
        removeSelectedDevice,
        setDevicePercentage,
        refreshAndGetSize,
        stopRecording,
        calculationHistory,
        refreshCalculationHistory,
        userType,
        setUserType,
        error,
    };
};
