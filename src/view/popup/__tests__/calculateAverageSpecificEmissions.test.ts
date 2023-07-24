import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB,
} from "../../../data/constants/CountryEmissions";
import { calculateAverageSpecificEmissionsHelper } from "../utils/calculateAverageSpecificEmissions";

describe("calculateAverageSpecificEmissionsHelper", () => {
    it("calculates the average specific emissions correctly", () => {
        const selectedCountries = new Map<CountryName, number>([
            ["United States", 50],
            ["China", 30],
            ["India", 20],
        ]);
        const expectedAverageSpecificEmissions =
            50 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["United States"] +
            30 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["China"] +
            20 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["India"];
        expect(calculateAverageSpecificEmissionsHelper(selectedCountries)).toBe(
            expectedAverageSpecificEmissions
        );
    });

    it("calculates the average specific emissions with world average when total percentage is less than 1", () => {
        const selectedCountries = new Map<CountryName, number>([
            ["United States", 50],
            ["China", 30],
        ]);
        const expectedAverageSpecificEmissions =
            50 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["United States"] +
            30 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["China"] +
            (1 - 50 - 30) * WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB;
        expect(calculateAverageSpecificEmissionsHelper(selectedCountries)).toBe(
            expectedAverageSpecificEmissions
        );
    });
});
