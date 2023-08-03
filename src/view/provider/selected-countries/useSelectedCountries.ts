import { useState } from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";
import { ISelectedCountriesRepository } from "../../../data/selected-countries/ISelectedCountriesRepository";
import { useMountEffect } from "../../../utils/hooks/useOnceAfterFirstMount";
import { percentageAboveHundredString } from "../../../utils/messages/errorMessages";
import { SelectedCountriesContextType } from "./SelectedCountriesProvider";

export const useSelectedCountries = (): SelectedCountriesContextType => {
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

        if (percentage > 100) {
            throw new Error(percentageAboveHundredString(percentage));
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
