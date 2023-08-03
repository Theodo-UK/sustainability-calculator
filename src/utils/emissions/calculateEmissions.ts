import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB,
} from "../../data/constants/CountryEmissions";

const BYTES_PER_GB = 1073741824;

export const calculateEmissions = (
    bytes: number,
    selectedCountries: Map<CountryName, number>
): number => {
    const _selectedCountries = new Map(selectedCountries);

    let totalPercentage = 0;
    let carbon = 0;
    _selectedCountries.forEach((percentage, country) => {
        totalPercentage += percentage;
        carbon +=
            (bytes / BYTES_PER_GB) *
            COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB[country] *
            percentage;
    });

    carbon +=
        (bytes / BYTES_PER_GB) *
        WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB *
        (1 - totalPercentage);

    return carbon;
};

export const calculateSoftwareEmissions = (
    kWhConsumption: number,
    locationEmissionGramsPerKWh: number
) => {
    return kWhConsumption * locationEmissionGramsPerKWh;
};
