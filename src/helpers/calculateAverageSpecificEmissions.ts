import { CO2_EMISSIONS_GRAMS_PER_GB, CountryName } from "../constants/Countries";

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
        averageSpecificEmissions += value * CO2_EMISSIONS_GRAMS_PER_GB[key];
    });

    const remainingPercentage = 1 - totalPercentage;

    if (noOfCountriesMissingPercentages > 0) {
        selectedCountries.forEach((value, key) => {
            if (value !== 0) {
                return;
            }
            averageSpecificEmissions += remainingPercentage / noOfCountriesMissingPercentages * CO2_EMISSIONS_GRAMS_PER_GB[key];
        });
    } else if (totalPercentage < 1) {
        averageSpecificEmissions += remainingPercentage * CO2_EMISSIONS_GRAMS_PER_GB["World Average"];
    }

    return averageSpecificEmissions;
}