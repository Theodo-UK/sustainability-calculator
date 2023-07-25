import React from "react";
import { COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB } from "../../../data/constants/CountryEmissions";
import { Dropdown } from "../atomic/Dropdown";
import { StyledDisclosure } from "../atomic/StyledDisclosure";
import { TileList } from "../atomic/TileList";

type SelectedCountriesDisclosureProps = {
    selectedCountries: Map<string, number>;
    addSelectedCountry: (country: string) => Promise<void>;
    removeSelectedCountry: (country: string) => Promise<void>;
    setCountryPercentage: (
        country: string,
        percentage: number
    ) => Promise<void>;
};

export const CountriesDisclosure = ({
    selectedCountries,
    addSelectedCountry,
    removeSelectedCountry,
    setCountryPercentage,
}: SelectedCountriesDisclosureProps) => {
    return (
        <StyledDisclosure
            title={`My users are based in... (${selectedCountries.size} selected)`}
        >
            <TileList
                elementMap={selectedCountries}
                removeElement={removeSelectedCountry}
                setElementPercentage={setCountryPercentage}
            />
            <Dropdown
                addSelectedElement={addSelectedCountry}
                selectedElements={selectedCountries}
                fullList={Object.keys(COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB)}
            />
        </StyledDisclosure>
    );
};
