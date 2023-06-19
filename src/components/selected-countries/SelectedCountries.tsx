import React from 'react';
import { CountryName } from '../../constants/Countries';

type SelectedCountriesType = {
    selectedCountries: Map<CountryName, number>;
    removeSelectedCountry: (country: CountryName) => void;
    setCountryPercentage: (country: CountryName, percentage: number) => void;
}

export const SelectedCountries = ({ selectedCountries, removeSelectedCountry, setCountryPercentage }: SelectedCountriesType) => {

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
                        <input type="number" onChange={(e) => setCountryPercentage(country, Number(e.target.value) / 100)} />
                    </li>
                ))}
            </ul>
        </div>
    )

}