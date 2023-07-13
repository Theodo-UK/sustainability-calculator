import React from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";
import { Tooltip } from "react-tooltip";

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
            <div className="flex-row">
                <h3>My users are based in...</h3>
                <div
                    className="rounded-full bg-gray-600"
                    data-tooltip-id="world-average-tip"
                    data-tooltip-content="The figure is used by default where countries have not been specified for a % of users"
                >
                    ?
                </div>
                <Tooltip id="world-average-tip" />
            </div>
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
