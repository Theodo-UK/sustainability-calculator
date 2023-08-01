import { useState } from "react";
import {
    CalculationData,
    ICalculationsRepository,
} from "../../../data/calculations/ICalculationsRepository";
import { HistoryContextType } from "./HistoryProvider";

export const useHistoryContext = (): HistoryContextType => {
    const calculationsRepository: ICalculationsRepository =
        ICalculationsRepository.instance;

    const [calculationHistory, setCalculationHistory] = useState<
        CalculationData[] | null
    >(null);

    const refreshCalculationHistory = async () => {
        const calculationsData =
            await calculationsRepository.getAllCalculations();
        setCalculationHistory(calculationsData);
    };

    return {
        calculationHistory,
        refreshCalculationHistory,
    };
};
