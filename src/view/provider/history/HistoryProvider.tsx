import React, { createContext } from "react";
import { CalculationData } from "../../../data/calculations/ICalculationsRepository";
import { useHistoryContext } from "./useHistoryContext";
interface Props {
    children: React.ReactNode;
}

export type HistoryContextType = {
    calculationHistory: CalculationData[];
    refreshCalculationHistory: () => Promise<void>;
};

export const HistoryContext = createContext<HistoryContextType | null>(null);

export const HistoryProvider = ({ children }: Props) => {
    const selectedCountriesContext = useHistoryContext();

    return (
        <HistoryContext.Provider value={selectedCountriesContext}>
            {children}
        </HistoryContext.Provider>
    );
};
