import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_KWH,
} from "../../../data/constants/CountryEmissions";

import {
    calculateDeviceEmissionsGramsPerSecond,
    calculateEmissions,
    calculateEnergyConsumptionkWh,
    calculateHardwareEmissions,
    calculateLocationEmissionsGramsPerKwh,
    calculateSoftwareEmissions,
} from "../calculateEmissions";

describe("calculateEmissions", () => {
    it("should return correct value", () => {
        const mockBytes = 12473123;
        const mockCountries = new Map([
            ["Australia", 0.2],
            ["United Kingdom", 0.3],
            ["Belgium", 0.2],
            ["Croatia", 0.1],
        ]);
        const mockDevices = new Map([
            ["Google Pixel 2", 0.2],
            ["Google Pixel 2 XL", 0.2],
            ["Google Pixel 3a", 0.2],
        ]);

        const kWhConsumption = calculateEnergyConsumptionkWh(mockBytes);
        const locationEmissionGramsPerKWh =
            calculateLocationEmissionsGramsPerKwh(mockCountries);
        const softwareEmissionsGrams = calculateSoftwareEmissions(
            kWhConsumption,
            locationEmissionGramsPerKWh
        );

        const mockflowTimeSeconds = 10;
        const deviceEmissionsGramsPerSecond =
            calculateDeviceEmissionsGramsPerSecond(mockDevices);
        const hardwareEmissionsGrams = calculateHardwareEmissions(
            mockflowTimeSeconds,
            deviceEmissionsGramsPerSecond
        );

        const emissions = calculateEmissions(
            softwareEmissionsGrams,
            hardwareEmissionsGrams
        );

        expect(emissions).toBeCloseTo(-1);
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
