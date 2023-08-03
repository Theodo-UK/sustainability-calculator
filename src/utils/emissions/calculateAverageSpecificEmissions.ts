import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB,
} from "../../data/constants/CountryEmissions";

export const calculateAverageSpecificEmissionsHelper = (
    selectedCountries: Map<CountryName, number>
): number => {
    let totalPercentage = 0;
    let averageSpecificEmissions = 0;

    selectedCountries.forEach((value, key) => {
        totalPercentage += value;
        averageSpecificEmissions +=
            value * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB[key];
    });

    if (totalPercentage < 1) {
        averageSpecificEmissions +=
            (1 - totalPercentage) * WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB;
    }

    return averageSpecificEmissions;
};
