import React, { useEffect } from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";
import { ITooltip } from "../atomic/ITooltip";

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
    const [worldPercentage, setWorldPercentage] = React.useState(1);
    const [isPercentageError, setIsPercentageError] = React.useState(false);
    const percentageError = "Percentages must stay between 0% and 100%";

    useEffect(() => {
        let totalPercentage = 0;
        selectedCountries.forEach((percentage) => {
            totalPercentage += percentage;
        });
        setWorldPercentage(1 - totalPercentage);
    }, [selectedCountries]);

    useEffect(() => {
        let countryHasError = false;
        selectedCountries.forEach((percentage) => {
            if (percentage > 1 || percentage < 0) countryHasError = true;
        });
        const worldHasError = worldPercentage > 1 || worldPercentage < 0;
        setIsPercentageError(countryHasError || worldHasError);
    }, [selectedCountries, worldPercentage]);

    return (
        <div className="w-full">
            <div className="relative flex items-center text-sm w-full gap-4 p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                <a className="ml-4">
                    {(worldPercentage * 100).toFixed(2)}% of users following
                    world average
                </a>
                <ITooltip
                    text="The figure is used by default<br />where countries have not been<br />specified for a % of users"
                    id="world-percentage"
                />
            </div>
            <ul>
                {Array.from(selectedCountries).map(([country, percentage]) => (
                    <li key={country}>
                        <div className="relative flex items-center text-sm w-full gap-4 p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                            <div className="flex items-center max-w-[14rem]">
                                <input
                                    className="w-12 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-1 mr-1"
                                    type="number"
                                    defaultValue={percentage * 100}
                                    onChange={(e) =>
                                        setCountryPercentage(
                                            country,
                                            Number(e.target.value) / 100
                                        )
                                    }
                                />
                                <a>% in {country}</a>
                            </div>
                            <button
                                className="absolute right-2 text-base bg-gray-200 hover:bg-white hover:shadow-inner rounded-lg w-6 h-6 my-auto"
                                onClick={() => removeSelectedCountry(country)}
                            >
                                -
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="text-red-500">
                {isPercentageError ? percentageError : null}
            </p>
        </div>
    );
};
