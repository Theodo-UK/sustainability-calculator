import React, { useEffect } from "react";
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
    const [worldPercentage, setWorldPercentage] = React.useState("100");
    useEffect(() => {
        let totalPercentage = 0;
        selectedCountries.forEach((percentage) => {
            totalPercentage += percentage;
        });
        setWorldPercentage(((1 - totalPercentage) * 100).toFixed(2));
    }, [selectedCountries]);

    return (
        <div>
            <h3 className="text-base font-bold"> My users are based in...</h3>
            <div className="flex">
                <a>
                    Percentage dispatched on the rest of the world:{" "}
                    {worldPercentage}%
                </a>
                <a
                    className="ml-2 rounded-full bg-gray-200 hover:bg-gray-300 w-6 h-6 flex items-center justify-center cursor-pointer"
                    data-tooltip-id="world-average-tip"
                    data-tooltip-html="The figure is used by default<br />where countries have not been<br />specified for a % of users"
                >
                    ?
                </a>
                <Tooltip id="world-average-tip" />
            </div>
            <ul>
                {Array.from(selectedCountries).map(([country, percentage]) => (
                    <li key={country}>
                        <button
                            className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6"
                            onClick={() => removeSelectedCountry(country)}
                        >
                            -
                        </button>
                        {country} (% users):
                        <input
                            className="w-16 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-2 py-1 ml-2"
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
