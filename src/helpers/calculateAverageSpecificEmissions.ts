import { COUNTRIES, CountryName } from "../constants/Countries";

export const calculateAverageSpecificEmissionsHelper = (selectedCountries: Map<CountryName, number>): number => {
    let totalPercentage = 0;
    let averageSpecificEmissions = 0;
    let noOfCountriesMissingPercentages = 0;

    selectedCountries.forEach((value, key) => {
        totalPercentage += value;
        if (value === 0) {
            noOfCountriesMissingPercentages += 1;
            return;
        }
        averageSpecificEmissions += value * COUNTRIES[key];
    });

    const remainingPercentage = 1 - totalPercentage;

    if (noOfCountriesMissingPercentages > 0) {
        selectedCountries.forEach((value, key) => {
            if (value !== 0) {
                return;
            }
            averageSpecificEmissions += remainingPercentage / noOfCountriesMissingPercentages * COUNTRIES[key];
        });
    } else if (totalPercentage < 1) {
        averageSpecificEmissions += remainingPercentage * COUNTRIES["World Average"];
    }

    return averageSpecificEmissions;
}