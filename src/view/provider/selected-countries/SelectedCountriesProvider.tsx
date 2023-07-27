import React, { createContext } from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";
import { useSelectedCountriesContext } from "./useSelectedCountriesContext";
interface Props {
    children: React.ReactNode;
}

export type SelectedCountriesContextType = {
    selectedCountries: Map<CountryName, number>;
    addSelectedCountry: (country: CountryName) => Promise<void>;
    removeSelectedCountry: (country: CountryName) => Promise<void>;
    setCountryPercentage: (
        country: CountryName,
        percentage: number
    ) => Promise<void>;
    validatePercentages: () => void;
};

export const SelectedCountriesContext =
    createContext<SelectedCountriesContextType | null>(null);

export const SelectedCountriesProvider = ({ children }: Props) => {
    const selectedCountriesContext = useSelectedCountriesContext();

    return (
        <SelectedCountriesContext.Provider value={selectedCountriesContext}>
            {children}
        </SelectedCountriesContext.Provider>
    );
};
