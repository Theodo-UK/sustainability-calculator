import React, { useEffect } from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";
import { PERCENTAGE_ERROR_MESSAGE } from "../../../utils/constants";
import { TileTooltip } from "../atomic/TileTooltip";

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
    const [worldPercentage, setWorldPercentage] = React.useState(100);
    const [isPercentageError, setIsPercentageError] = React.useState(false);

    useEffect(() => {
        const totalPercentage = Array.from(selectedCountries.values()).reduce(
            (total, entry) => total + entry,
            0
        );
        setWorldPercentage(100 - totalPercentage);
    }, [selectedCountries]);

    useEffect(() => {
        const hasPercentageError = Array.from(selectedCountries.values()).some(
            (percentage) => percentage > 100 || percentage < 0
        );
        const worldHasError = worldPercentage > 100 || worldPercentage < 0;
        setIsPercentageError(hasPercentageError || worldHasError);
    }, [selectedCountries, worldPercentage]);

    return (
        <div className="w-full relative">
            <div className="relative flex items-center text-sm w-full gap-1 p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                <div className="flex items-start max-w-[14rem]">
                    <input
                        className="w-12 text-gray-800 bg-gray-100 border border-gray-200 rounded-md shadow-sm pl-1 mr-1"
                        type="string"
                        value={worldPercentage.toFixed(2)}
                        disabled
                    />
                    <a>% of users following world average</a>
                </div>
                <TileTooltip
                    text="The figure is used by default<br />where countries have not been<br />specified for a % of users"
                    id="world-percentage"
                />
            </div>
            <ul>
                {Array.from(selectedCountries).map(([country, percentage]) => (
                    <li key={country}>
                        <div className="relative flex items-center text-sm w-full p-2 my-2 bg-rose-quartz bg-opacity-20 rounded-lg">
                            <div className="flex items-start max-w-[14rem]">
                                <input
                                    className="w-12 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-1 mr-1"
                                    type="number"
                                    defaultValue={percentage}
                                    onChange={(e) =>
                                        setCountryPercentage(
                                            country,
                                            Number(e.target.value)
                                        )
                                    }
                                />
                                <a>% in {country}</a>
                            </div>
                            <button
                                className="country-tile-button "
                                onClick={() => removeSelectedCountry(country)}
                            >
                                -
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="text-red-500">
                {isPercentageError ? PERCENTAGE_ERROR_MESSAGE : null}
            </p>
        </div>
    );
};
