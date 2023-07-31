import React, { createContext } from "react";
import { useHistoryContext } from "./useHistoryContext";
interface Props {
    children: React.ReactNode;
}

export type HistoryContextType = {
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
