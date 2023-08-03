import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_KWH,
} from "../../../data/constants/CountryEmissions";
import {
    AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    AVG_DEVICE_LIFETIME_SECONDS,
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
} from "../../../data/constants/DeviceEmissions";

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
        const mockCountries = new Map<CountryName, number>([
            ["United States", 50],
            ["China (PR)", 30],
            ["India", 20],
        ]);
        const mockDevices = new Map<DeviceName, number>([
            ["Google Pixel 3a XL", 50],
            ["Google Pixel 4", 30],
            ["Google Pixel 4 XL", 20],
        ]);

        const kWhConsumption = calculateEnergyConsumptionkWh(mockBytes);
        const locationEmissionGramsPerKWh =
            calculateLocationEmissionsGramsPerKwh(mockCountries);
        const softwareEmissionsGrams = calculateSoftwareEmissions(
            kWhConsumption,
            locationEmissionGramsPerKWh
        );

        const mockflowTimeSeconds = 1200;
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

        expect(emissions).toBeCloseTo(5.8049017187);
    });
});

describe("calculateLocationEmissionsGramsPerKwh", () => {
    it("calculates correctly", () => {
        const mockCountries = new Map<CountryName, number>([
            ["United States", 50],
            ["China (PR)", 30],
            ["India", 20],
        ]);
        const expectedAverageSpecificEmissions =
            0.5 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["United States"] +
            0.3 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["China (PR)"] +
            0.2 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["India"];
        expect(calculateLocationEmissionsGramsPerKwh(mockCountries)).toBe(
            expectedAverageSpecificEmissions
        );
    });

    it("uses the world average when total percentage is less than 100%", () => {
        const mockCountries = new Map<CountryName, number>([
            ["United States", 50],
            ["India", 30],
        ]);
        const expectedAverageSpecificEmissions =
            0.5 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["United States"] +
            0.3 * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH["India"] +
            (1 - 0.5 - 0.3) * WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_KWH;
        expect(calculateLocationEmissionsGramsPerKwh(mockCountries)).toBe(
            expectedAverageSpecificEmissions
        );
    });
});

describe("calculateDeviceEmissionsGramsPerSecond", () => {
    it("calculates correctly", () => {
        const mockDevices = new Map<DeviceName, number>([
            ["Google Pixel 3a XL", 50],
            ["Google Pixel 4", 30],
            ["Google Pixel 4 XL", 20],
        ]);

        const expectedAverageSpecificEmissions =
            (0.5 * DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS["Google Pixel 3a XL"] +
                0.3 * DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS["Google Pixel 4"] +
                0.2 *
                    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS["Google Pixel 4 XL"]) /
            AVG_DEVICE_LIFETIME_SECONDS;
        expect(calculateDeviceEmissionsGramsPerSecond(mockDevices)).toBe(
            expectedAverageSpecificEmissions
        );
    });

    it("uses the world average when total percentage is less than 100%", () => {
        const mockDevices = new Map<DeviceName, number>([
            ["Google Pixel 3a XL", 50],
            ["Google Pixel 4 XL", 30],
        ]);
        const expectedAverageSpecificEmissions =
            (0.5 * DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS["Google Pixel 3a XL"] +
                0.3 * DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS["Google Pixel 4 XL"] +
                (1 - 0.5 - 0.3) * AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS) /
            AVG_DEVICE_LIFETIME_SECONDS;
        expect(calculateDeviceEmissionsGramsPerSecond(mockDevices)).toBe(
            expectedAverageSpecificEmissions
        );
    });
});
