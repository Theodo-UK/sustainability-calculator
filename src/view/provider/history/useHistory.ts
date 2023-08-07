import { useState } from "react";
import { CalculationData } from "../../../data/calculations/CalculationData";
import { CalculationsRepository } from "../../../data/calculations/CalculationsRepository";
import { HistoryContextType } from "./HistoryProvider";

export const useHistory = (): HistoryContextType => {
    const [calculationHistory, setCalculationHistory] = useState<
        CalculationData[] | null
    >(null);

    const refreshCalculationHistory = async () => {
        const calculationsData =
            await CalculationsRepository.getAllCalculations();
        setCalculationHistory(calculationsData);
    };

    return {
        calculationHistory,
        refreshCalculationHistory,
    };
};
