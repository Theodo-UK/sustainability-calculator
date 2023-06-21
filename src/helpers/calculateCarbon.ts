import { COUNTRIES, CountryName } from "../constants/Countries";

export const calculateCarbon = (transferSize: number, selectedCountries: Map<CountryName, number>): number => {
    const _selectedCountries = new Map(selectedCountries);
    let totalPercentage = 0;

    let noOfCountriesMissingPercentages = 0;

    _selectedCountries.forEach((value, key) => {
        totalPercentage += value;
        if (value === 0) {
            noOfCountriesMissingPercentages += 1;
        }
    });

    const remainingPercentage = 1 - totalPercentage;

    if (noOfCountriesMissingPercentages > 0) {
        _selectedCountries.forEach((value, key) => {
            if (value !== 0) {
                return;
            }
            _selectedCountries.set(key, remainingPercentage / noOfCountriesMissingPercentages);
        });
    }
    let carbon = 0;
    _selectedCountries.forEach((percentage, country) => {
        carbon += (transferSize / 1073741824) * COUNTRIES[country] * percentage;
    });
    return carbon;


}