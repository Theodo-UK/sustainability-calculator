import React from 'react';
import { CountryName } from '../../constants/Countries';

type SelectedCountriesType = {
    selectedCountries: Set<CountryName>;
}

export const SelectedCountries = ({selectedCountries} : SelectedCountriesType) => {

    return (
        <h3 >
            Selected Countries
        </h3>
    )

}