import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB,
} from "../../../data/constants/CountryEmissions";
import { DeviceName } from "../../../data/constants/DeviceEmissions";

import {
    calculateEmbodiedEmissions,
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
            50 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["United States"] +
            30 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["China"] +
            20 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["India"];
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
            50 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["United States"] +
            30 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["China"] +
            (1 - 50 - 30) * WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_GB;
        expect(calculateLocationEmissionsGramsPerKwh(selectedCountries)).toBe(
            expectedAverageSpecificEmissions
        );
    });
});

const mockDevice: Map<DeviceName, number> = new Map([["iPhone 11", 1]]);

const mockDevices: Map<DeviceName, number> = new Map([
    ["iPhone 11", 0.2],
    ["iPhone 7", 0.2],
    ["Google Pixel 5", 0.4],
]);

describe("calculateEmbodiedEmissions", () => {
    it("device should return corresponding value", () => {
        expect(calculateEmbodiedEmissions(100, mockDevice)).toBeCloseTo(
            0.057038558
        );
    });

    it("multiple devices should return corresponding carbon consumption for a given transfer size", () => {
        expect(calculateEmbodiedEmissions(100, mockDevices)).toBeCloseTo(
            0.06065546
        );
    });
});
