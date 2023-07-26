import { useEffect, useState } from "react";
import {
    CalculationData,
    ICalculationsRepository,
    UserType,
} from "../../data/calculations/ICalculationsRepository";
import { SelectedCountriesContextType } from "./initSelectedCountriesContext";
import { backgroundStopRecordingBytes } from "./utils/backgroundStopRecordingBytes";
import { calculateAverageSpecificEmissionsHelper } from "./utils/calculateAverageSpecificEmissions";
import { calculateCarbon } from "./utils/calculateCarbon";
import { refreshActiveTabAndRecordBytes } from "./utils/refreshActiveTabAndRecordBytes";

export const usePopup = (
    selectedCountriesContext: SelectedCountriesContextType
) => {
    const calculationsRepository: ICalculationsRepository =
        ICalculationsRepository.instance;

    const [bytesTransferred, setBytesTransferred] = useState(0);
    const [emissions, setEmissions] = useState(0);

    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [error, setError] = useState<string>();
    const [calculationHistory, setCalculationHistory] = useState<
        CalculationData[]
    >([]);
    const [userType, setUserType] = useState<UserType>("new user");

    const refreshCalculationHistory = async () => {
        const calculationsData =
            await calculationsRepository.getAllCalculations();
        setCalculationHistory(calculationsData);
    };

    const refreshAndGetSize = async () => {
        try {
            selectedCountriesContext.validatePercentages();
            setAverageSpecificEmissions(
                calculateAverageSpecificEmissionsHelper(
                    selectedCountriesContext.selectedCountries
                )
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        try {
            await calculationsRepository.setOngoingCalculation(true);
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
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
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
                const _bytes = message.command.bytesTransferredChanged;
                setBytesTransferred(_bytes);
                const _emissions = calculateCarbon(
                    _bytes,
                    selectedCountriesContext.selectedCountries
                );
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
    }, [selectedCountriesContext.selectedCountries]);

    useEffect(() => {
        const getLastCalculationAndSetState = async () => {
            if (await calculationsRepository.isOngoingCalculation()) {
                const _bytes = await chrome.runtime.sendMessage(
                    "getBytesTransferred"
                );

                setBytesTransferred(_bytes);
                setEmissions(
                    calculateCarbon(
                        _bytes,
                        selectedCountriesContext.selectedCountries
                    )
                );
                setAverageSpecificEmissions(
                    calculateAverageSpecificEmissionsHelper(
                        selectedCountriesContext.selectedCountries
                    )
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
    }, [calculationsRepository, selectedCountriesContext.selectedCountries]);

    return {
        emissions,
        bytesTransferred,
        refreshAndGetSize,
        stopRecording,
        calculationHistory,
        refreshCalculationHistory,
        userType,
        setUserType,
        error,
    };
};
