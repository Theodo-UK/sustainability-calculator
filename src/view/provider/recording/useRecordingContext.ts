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
import { useRootContext } from "../useRootContext";
import { RecordingContextType } from "./RecordingProvider";

export const useRecordingContext = (): RecordingContextType => {
    const {
        selectedCountriesContext: { selectedCountries, validatePercentages },
    } = useRootContext();

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
            await refreshCalculationHistory();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

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

    return { startRecording, stopRecording };
};
