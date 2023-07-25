import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB,
} from "../../../data/constants/CountryEmissions";
import {
    DEVICE_CO2_EMISSIONS_GRAMS_PER_HOUR,
    DeviceName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_HOUR,
} from "../../../data/constants/DeviceEmissions";

export const calculateBytesAverageSpecificEmissions = (
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

export const calculateFlowTimeAverageSpecificEmissions = (
    selectedDevices: Map<DeviceName, number>
): number => {
    let totalPercentage = 0;
    let averageSpecificEmissions = 0;

    selectedDevices.forEach((value, key) => {
        totalPercentage += value;
        averageSpecificEmissions +=
            value * DEVICE_CO2_EMISSIONS_GRAMS_PER_HOUR[key];
    });

    if (totalPercentage < 1) {
        averageSpecificEmissions +=
            (1 - totalPercentage) * WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_HOUR;
    }

    return averageSpecificEmissions;
};
