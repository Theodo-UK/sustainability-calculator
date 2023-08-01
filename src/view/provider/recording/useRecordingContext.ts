import { useEffect, useState } from "react";
import {
    CalculationData,
    ICalculationsRepository,
    UserType,
} from "../../../data/calculations/ICalculationsRepository";
import { backgroundStopRecordingBytes } from "../../popup/utils/backgroundStopRecordingBytes";
import { calculateAverageSpecificEmissionsHelper } from "../../popup/utils/calculateAverageSpecificEmissions";
import { calculateCarbon } from "../../popup/utils/calculateCarbon";
import { refreshActiveTabAndRecordBytes } from "../../popup/utils/refreshActiveTabAndRecordBytes";
import {
    SelectedCountriesContext,
    SelectedCountriesContextType,
} from "../selected-countries/SelectedCountriesProvider";
import { useNullSafeContext } from "../useNullSafeContext";
import { RecordingContextType } from "./RecordingProvider";

export const useRecordingContext = (): RecordingContextType => {
    const { selectedCountries, validatePercentages } =
        useNullSafeContext<SelectedCountriesContextType>(
            SelectedCountriesContext
        );

    const calculationsRepository: ICalculationsRepository =
        ICalculationsRepository.instance;

    const [emissions, setEmissions] = useState(0);
    const [bytesTransferred, setBytesTransferred] = useState(0);
    const [error, setError] = useState<string>();
    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [userType, setUserType] = useState<UserType>("new user");

    const startRecording = async (): Promise<boolean> => {
        try {
            validatePercentages();
            setAverageSpecificEmissions(
                calculateAverageSpecificEmissionsHelper(selectedCountries)
            );
            await calculationsRepository.setOngoingCalculation(true);
            await refreshActiveTabAndRecordBytes(userType === "new user");
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
            await calculationsRepository.storeCalculation(
                new CalculationData(
                    bytesTransferred,
                    emissions,
                    averageSpecificEmissions,
                    selectedCountries,
                    Date.now(),
                    userType
                )
            );
            await calculationsRepository.setOngoingCalculation(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        const getLastCalculationAndSetState = async () => {
            if (await calculationsRepository.isOngoingCalculation()) {
                const bytesTransferred = await chrome.runtime.sendMessage(
                    "getBytesTransferred"
                );

                setBytesTransferred(bytesTransferred);
                setEmissions(
                    calculateCarbon(bytesTransferred, selectedCountries)
                );
                setAverageSpecificEmissions(
                    calculateAverageSpecificEmissionsHelper(selectedCountries)
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
    }, [calculationsRepository, selectedCountries]);

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
                const emissions = calculateCarbon(
                    bytesTransferred,
                    selectedCountries
                );
                setEmissions(emissions);
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
