import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH,
    CountryName,
} from "../constants/CountryEmissions";
const countryNames = Object.keys(
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH
) as CountryName[];

export const isSelectedCountriesMap = (
    data: unknown
): data is Map<CountryName, number> => {
    if (!(data instanceof Map)) {
        return false;
    }

    const keys = Array.from(data.keys());
    const values = Array.from(data.values());

    if (
        keys.some((key) => !countryNames.includes(key)) ||
        values.some((value) => typeof value !== "number")
    ) {
        return false;
    }

    return true;
};
