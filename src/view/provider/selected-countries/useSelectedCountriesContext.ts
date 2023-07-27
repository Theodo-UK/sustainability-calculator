import { useState } from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";
import { ISelectedCountriesRepository } from "../../../data/selected-countries/ISelectedCountriesRepository";
import { useMountEffect } from "../../popup/useOnceAfterFirstMount";

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

export const useSelectedCountriesContext = (): SelectedCountriesContextType => {
    const selectedCountriesRepository: ISelectedCountriesRepository =
        ISelectedCountriesRepository.instance;
    const [selectedCountries, setSelectedCountries] = useState<
        Map<CountryName, number>
    >(new Map<CountryName, number>());
    const addSelectedCountry = async (country: CountryName) => {
        await selectedCountriesRepository.addSelectedCountry(country);
        const newSelectedCountries =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newSelectedCountries);
    };

    const removeSelectedCountry = async (country: CountryName) => {
        await selectedCountriesRepository.removeSelectedCountry(country);
        const newSelectedCountries =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newSelectedCountries);
    };

    const setCountryPercentage = async (
        country: CountryName,
        percentage: number
    ) => {
        await selectedCountriesRepository.setSelectedCountryPercentage(
            country,
            percentage
        );
        const newSelectedCountries =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newSelectedCountries);
    };
    const validatePercentages = () => {
        const percentage = Array.from(selectedCountries.values()).reduce(
            (accumulator, country) => {
                return accumulator + country;
            },
            0
        );

        if (percentage > 1) {
            throw new Error(
                `Error: The sum of the percentages is greater than 100%. Current sum: ${(
                    percentage * 100
                ).toFixed(0)}%`
            );
        }
    };

    useMountEffect(() => {
        const getSelectedCountriesAndSetState = async () => {
            const _selectedCountries =
                await selectedCountriesRepository.getSelectedCountriesAndPercentages();
            setSelectedCountries(_selectedCountries);
        };
        getSelectedCountriesAndSetState();
    });

    return {
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        validatePercentages,
    };
};