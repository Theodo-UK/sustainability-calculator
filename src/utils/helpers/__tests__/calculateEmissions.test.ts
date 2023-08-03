import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_KWH,
} from "../../../data/constants/CountryEmissions";

import {
    calculateEmissions,
    calculateLocationEmissionsGramsPerKwh,
} from "../calculateEmissions";

const mockCountry: Map<CountryName, number> = new Map([["Australia", 0.5]]);

const mockCountries: Map<CountryName, number> = new Map([
    ["Australia", 0.2],
    ["United Kingdom", 0.3],
    ["Belgium", 0.2],
    ["Bulgaria", 0.2],
    ["Croatia", 0.1],
]);

const mockSmallBytes = 50;
const mockLargeBytes = 500000;

describe("calculateEmissions", () => {
    it("country should return corresponding value", () => {
        expect(calculateEmissions(mockSmallBytes, mockCountry)).toBeCloseTo(
            0.000017695
        );
    });

    it("multiple countries should return corresponding carbon consumption for a given transfer size", () => {
        expect(calculateEmissions(mockLargeBytes, mockCountries)).toBeCloseTo(
            0.16074
        );
    });
});

describe("calculateLocationEmissionsGramsPerKwh", () => {
    it("calculates the average specific emissions correctly", () => {
        const selectedCountries = new Map<CountryName, number>([
            ["United States", 50],
            ["China", 30],
            ["India", 20],
        ]);
        const expectedAverageSpecificEmissions =
            50 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["United States"] +
            30 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["China"] +
            20 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["India"];
        expect(calculateLocationEmissionsGramsPerKwh(selectedCountries)).toBe(
            expectedAverageSpecificEmissions
        );
    });

    it("calculates the average specific emissions with world average when total percentage is less than 1", () => {
        const selectedCountries = new Map<CountryName, number>([
            ["United States", 50],
            ["China", 30],
        ]);
        const expectedAverageSpecificEmissions =
            50 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["United States"] +
            30 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["China"] +
            (1 - 50 - 30) * WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_KWH;
        expect(calculateLocationEmissionsGramsPerKwh(selectedCountries)).toBe(
            expectedAverageSpecificEmissions
        );
    });
});
