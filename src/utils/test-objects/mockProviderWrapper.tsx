import React from "react";
import {
    SelectedCountriesContext,
    SelectedCountriesContextType,
} from "../../view/provider/selected-countries/SelectedCountriesProvider";

export const mockProviderWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const selectedCountriesContext: SelectedCountriesContextType = {
        selectedCountries: new Map([]),
        addSelectedCountry: jest.fn(),
        removeSelectedCountry: jest.fn(),
        validatePercentages: jest.fn(),
        setCountryPercentage: jest.fn(),
    };

    return (
        <SelectedCountriesContext.Provider value={selectedCountriesContext}>
            {children}
        </SelectedCountriesContext.Provider>
    );
};
