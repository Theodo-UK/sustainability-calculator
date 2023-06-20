import { WORLDAVERAGE, COUNTRIES, CountryName } from "../constants/Countries";

export const calculateAverageSpecificEmissionsHelper = (selectedCountries: Map<CountryName, number>): number => {
    let totalPercentage = 0;
    let averageSpecificEmissions = 0;
    let noOfCountriesMissingPercentages = 0;

    // Countries selected, 
    selectedCountries.forEach((value, key) => {
        totalPercentage += value;
        if (value === 0) {
            noOfCountriesMissingPercentages += 1;
            return;
        }
        // Calculate average specific emissions of countries with percentage input
        averageSpecificEmissions += value * COUNTRIES[key];
    });

    const remainingPercentage = 1 - totalPercentage;

    // If there are selected countries with no percentage input, take remaining percentage and divide it by the number of countries missing percentage input
    if (noOfCountriesMissingPercentages > 0) {
        selectedCountries.forEach((value, key) => {
            if (value !== 0) {
                return;
            }
            averageSpecificEmissions += remainingPercentage / noOfCountriesMissingPercentages * COUNTRIES[key];
        });
    } else if (totalPercentage < 1) {
        // If there are no countries missing percentage input, add remaining percentage to world average
        averageSpecificEmissions += remainingPercentage * WORLDAVERAGE;
    }

    return averageSpecificEmissions;
}