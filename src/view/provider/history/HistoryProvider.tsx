import React, { createContext } from "react";
import { CalculationData } from "../../data/calculations/CalculationData";
import { useHistory } from "./useHistory";
interface Props {
    children: React.ReactNode;
}

export type HistoryContextType = {
    calculationHistory: CalculationData[] | null;
    refreshCalculationHistory: () => Promise<void>;
};

export const HistoryContext = createContext<HistoryContextType | null>(null);

export const HistoryProvider = ({ children }: Props) => {
    const selectedCountriesContext = useHistory();

    return (
        <HistoryContext.Provider value={selectedCountriesContext}>
            {children}
        </HistoryContext.Provider>
    );
};
