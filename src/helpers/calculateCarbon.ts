import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
} from "../data/constants/CountryEmissions";

export const calculateCarbon = (
    bytes: number,
    selectedCountries: Map<CountryName, number>
): number => {
    const _selectedCountries = new Map(selectedCountries);
    let totalPercentage = 0;

    let noOfCountriesMissingPercentages = 0;

    _selectedCountries.forEach((value) => {
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
            _selectedCountries.set(
                key,
                remainingPercentage / noOfCountriesMissingPercentages
            );
        });
    }
    let carbon = 0;
    _selectedCountries.forEach((percentage, country) => {
        carbon +=
            (bytes / 1073741824) *
            COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB[country] *
            percentage;
    });
    return carbon;
};
