import { useEffect, useState } from "react";
import {
    CalculationData
} from "../../data/calculations/ICalculationsRepository";
import { useRootContext } from "../provider/useRootContext";
import { backgroundStopRecordingBytes } from "./utils/backgroundStopRecordingBytes";
import { calculateAverageSpecificEmissionsHelper } from "./utils/calculateAverageSpecificEmissions";
import { calculateCarbon } from "./utils/calculateCarbon";

export const usePopup = () => {
    const {
        selectedCountriesContext: { selectedCountries, validatePercentages },
    } = useRootContext();

    const [bytesTransferred, setBytesTransferred] = useState(0);
    const [emissions, setEmissions] = useState(0);

    const [calculationHistory, setCalculationHistory] = useState<
        CalculationData[]
    >([]);

    const refreshCalculationHistory = async () => {
        const calculationsData =
            await calculationsRepository.getAllCalculations();
        setCalculationHistory(calculationsData);
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

    return {
        emissions,
        bytesTransferred,
        stopRecording,
        calculationHistory,
        refreshCalculationHistory,
        userType,
        setUserType,
    };
};
