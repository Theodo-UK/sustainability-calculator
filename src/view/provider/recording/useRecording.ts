import { useEffect, useMemo, useState } from "react";

import { CalculationData } from "../../../data/calculations/CalculationData";
import { CalculationsRepository } from "../../../data/calculations/CalculationsRepository";
import { UserType } from "../../../data/calculations/UserType";
import { RecordingRepository } from "../../../data/recording/RecordingRepository";
import {
    calculateDeviceEmissionsGramsPerSecond,
    calculateEmissions,
    calculateEnergyConsumptionkWh,
    calculateHardwareEmissions,
    calculateLocationEmissionsGramsPerKwh,
    calculateSoftwareEmissions,
} from "../../../utils/helpers/calculateEmissions";
import { useMountEffect } from "../../../utils/hooks/useOnceAfterFirstMount";
import {
    SelectedCountriesContext,
    SelectedCountriesContextType,
} from "../selected-countries/SelectedCountriesProvider";
import {
    SelectedDevicesContext,
    SelectedDevicesContextType,
} from "../selected-devices/SelectedDevicesProvider";
import { useNullSafeContext } from "../useNullSafeContext";
import { RecordingContextType } from "./RecordingProvider";
import {
    backgroundStopRecordingBytes,
    getBytesFromBackground,
    getBytesFromStorage,
    refreshActiveTab,
    startRecordingBytesTransferred,
} from "./helpers";

export const useRecording = (): RecordingContextType => {
    const { selectedCountries, validatePercentages } =
        useNullSafeContext<SelectedCountriesContextType>(
            SelectedCountriesContext
        );

    const { selectedDevices } = useNullSafeContext<SelectedDevicesContextType>(
        SelectedDevicesContext
    );

    const [bytesTransferred, setBytesTransferred] = useState(0);
    const [error, setError] = useState<string>();
    const [userType, setUserType] = useState<UserType>("new user");

    const kwhConsumption = useMemo(
        () => calculateEnergyConsumptionkWh(bytesTransferred),
        [bytesTransferred]
    );
    const locationEmissionsGramsPerKwh = useMemo(
        () => calculateLocationEmissionsGramsPerKwh(selectedCountries),
        [selectedCountries]
    );
    const softwareEmissions = useMemo(
        () =>
            calculateSoftwareEmissions(
                kwhConsumption,
                locationEmissionsGramsPerKwh
            ),
        [kwhConsumption, locationEmissionsGramsPerKwh]
    );

    const [flowTime, setFlowTime] = useState(0);
    const deviceEmissionsGramsPerSecond = useMemo(
        () => calculateDeviceEmissionsGramsPerSecond(selectedDevices),
        [selectedDevices]
    );
    const hardwareEmissions = useMemo(
        () =>
            calculateHardwareEmissions(flowTime, deviceEmissionsGramsPerSecond),
        [flowTime, deviceEmissionsGramsPerSecond]
    );

    const emissions = useMemo(
        () => calculateEmissions(softwareEmissions, hardwareEmissions),
        [softwareEmissions, hardwareEmissions]
    );

    const averageSpecificEmissions = useMemo(
        () => calculateLocationEmissionsGramsPerKwh(selectedCountries),
        [selectedCountries]
    );

    const startRecording = async (): Promise<boolean> => {
        try {
            validatePercentages();
            await RecordingRepository.setOngoingCalculation(true);
            await RecordingRepository.setStartUnixTime(Date.now());
            await refreshActiveTab(userType === "new user");
            await startRecordingBytesTransferred();
            setError(undefined);

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            return false;
        }
    };

    const stopRecording = async (): Promise<void> => {
        backgroundStopRecordingBytes();
        try {
            const startUnixTimeMs =
                await RecordingRepository.getStartUnixTime();
            const endUnixTimeMs = Date.now();

            await CalculationsRepository.storeCalculation(
                new CalculationData(
                    bytesTransferred,
                    selectedCountries,
                    selectedDevices,
                    startUnixTimeMs,
                    endUnixTimeMs,
                    userType
                )
            );
            setFlowTime((endUnixTimeMs - startUnixTimeMs) / 1000);
            await RecordingRepository.setOngoingCalculation(false);
            await RecordingRepository.clearStartUnixTime();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    useMountEffect(() => {
        const setBytesOnMount = async () => {
            if (await RecordingRepository.isOngoingCalculation()) {
                const bytesTransferred = await getBytesFromBackground();
                setBytesTransferred(bytesTransferred);
                return;
            }

            const bytesTransferred = await getBytesFromStorage();
            setBytesTransferred(bytesTransferred);
        };

        setBytesOnMount();
    });

    useEffect(() => {
        const bytesTransferredChangedListener = (
            message: { command: { bytesTransferredChanged: number } },
            sender: chrome.runtime.MessageSender,
            sendResponse: (response?: boolean) => void
        ) => {
            if (message.command.bytesTransferredChanged) {
                const bytesTransferred =
                    message.command.bytesTransferredChanged;
                setBytesTransferred(bytesTransferred);
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

    return {
        startRecording,
        stopRecording,
        bytesTransferred,
        emissions,
        error,
        userType,
        setUserType,
    };
};
