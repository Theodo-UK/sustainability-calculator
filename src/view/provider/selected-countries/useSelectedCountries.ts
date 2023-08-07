import { useState } from "react";
import { CountryName } from "../../../data/constants/CountryEmissions";
import { SelectedCountriesRepository } from "../../../data/selected-countries/SelectedCountriesRepository";
import { useMountEffect } from "../../../utils/hooks/useOnceAfterFirstMount";
import { percentageAboveHundredString } from "../../../utils/messages/errorMessages";
import { SelectedCountriesContextType } from "./SelectedCountriesProvider";

export const useSelectedCountries = (): SelectedCountriesContextType => {
    const [selectedCountries, setSelectedCountries] = useState<
        Map<CountryName, number>
    >(new Map<CountryName, number>());
    const addSelectedCountry = async (country: CountryName) => {
        await SelectedCountriesRepository.addSelectedCountry(country);
        const newSelectedCountries =
            await SelectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newSelectedCountries);
    };

    const removeSelectedCountry = async (country: CountryName) => {
        await SelectedCountriesRepository.removeSelectedCountry(country);
        const newSelectedCountries =
            await SelectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newSelectedCountries);
    };

    const setCountryPercentage = async (
        country: CountryName,
        percentage: number
    ) => {
        await SelectedCountriesRepository.setSelectedCountryPercentage(
            country,
            percentage
        );
        const newSelectedCountries =
            await SelectedCountriesRepository.getSelectedCountriesAndPercentages();
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
                await SelectedCountriesRepository.getSelectedCountriesAndPercentages();
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
