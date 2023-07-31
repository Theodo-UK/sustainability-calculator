import { useEffect, useState } from "react";
import { CalculationData } from "../../data/calculations/ICalculationsRepository";
import { useRootContext } from "../provider/useRootContext";
import { calculateAverageSpecificEmissionsHelper } from "./utils/calculateAverageSpecificEmissions";
import { calculateCarbon } from "./utils/calculateCarbon";

export const usePopup = () => {
    const {
        selectedCountriesContext: { selectedCountries, validatePercentages },
    } = useRootContext();

    const [calculationHistory, setCalculationHistory] = useState<
        CalculationData[]
    >([]);

    const refreshCalculationHistory = async () => {
        const calculationsData =
            await calculationsRepository.getAllCalculations();
        setCalculationHistory(calculationsData);
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
