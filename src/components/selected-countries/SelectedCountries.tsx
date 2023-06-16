import React from 'react';
import { CountryName } from '../../constants/Countries';

type SelectedCountriesType = {
    selectedCountries: Set<CountryName>;
    removeSelectedCountry: (country: CountryName) => void;
}

export const SelectedCountries = ({ selectedCountries, removeSelectedCountry }: SelectedCountriesType) => {

    return (
        <div>
            <h3 >
                Selected Countries
            </h3>
            <ul>
                {Array.from(selectedCountries).map((country) => (
                    <li key={country}>
                        {country}
                        <button onClick={() => removeSelectedCountry(country)}>
                            -
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

}