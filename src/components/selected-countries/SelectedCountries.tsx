import React from 'react';
import { CountryName } from '../../constants/Countries';

type SelectedCountriesType = {
    selectedCountries: Map<CountryName,number>;
    removeSelectedCountry: (country: CountryName) => void;
}

export const SelectedCountries = ({ selectedCountries, removeSelectedCountry }: SelectedCountriesType) => {

    return (
        <div>
            <h3 >
                Selected Countries
            </h3>
            <ul>
                {Array.from(selectedCountries).map(([country, percentage]) => (
                    <li key={country}>
                        <button onClick={() => removeSelectedCountry(country as CountryName)}>
                            -
                        </button>
                        {country}
                        <input type="number" />
                    </li>
                ))}
            </ul>
        </div>
    )

}