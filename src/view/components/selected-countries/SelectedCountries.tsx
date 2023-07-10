import React from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";

type SelectedCountriesType = {
    selectedCountries: Map<CountryName, number>;
    removeSelectedCountry: (country: CountryName) => void;
    setCountryPercentage: (country: CountryName, percentage: number) => void;
};

export const SelectedCountries = ({
    selectedCountries,
    removeSelectedCountry,
    setCountryPercentage,
}: SelectedCountriesType) => {
    return (
        <div>
            <h3>Selected Countries</h3>
            <ul>
                {Array.from(selectedCountries).map(([country, percentage]) => (
                    <li key={country}>
                        <button onClick={() => removeSelectedCountry(country)}>
                            -
                        </button>
                        {country} (% users):
                        <input
                            type="number"
                            defaultValue={percentage * 100}
                            onChange={(e) =>
                                setCountryPercentage(
                                    country,
                                    Number(e.target.value) / 100
                                )
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
