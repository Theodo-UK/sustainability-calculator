import {
    COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH,
    CountryName,
    WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_KWH,
} from "../../data/constants/CountryEmissions";
import {
    AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
} from "../../data/constants/DeviceEmissions";

export const calculateEmissions = (
    softwareEmissionsGrams: number,
    hardwareEmissionsGrams: number
) => {
    return softwareEmissionsGrams + hardwareEmissionsGrams;
};

export const calculateSoftwareEmissions = (
    kWhConsumption: number,
    locationEmissionGramsPerKWh: number
) => {
    return kWhConsumption * locationEmissionGramsPerKWh;
};

export const calculateHardwareEmissions = (
    flowTimeSeconds: number,
    deviceEmissionsGramsPerSecond: number
) => {
    return flowTimeSeconds * deviceEmissionsGramsPerSecond;
};

export const calculateEnergyConsumptionkWh = (bytesTransferred: number) => {
    const dataTransferredGb = bytesTransferred / (10 ^ 9);
    const energykWhPerGb = 0.81;
    return dataTransferredGb * energykWhPerGb;
};

export const calculateLocationEmissionsGramsPerKwh = (
    selectedCountries: Map<CountryName, number>
) => {
    let totalPercentage = 0;
    let gramsPerKwh = 0;

    selectedCountries.forEach((value, key) => {
        totalPercentage += value;
        gramsPerKwh += value * COUNTRY_CO2_EMISSIONS_GRAMS_PER_KWH[key];
    });

    if (totalPercentage < 1) {
        gramsPerKwh +=
            (1 - totalPercentage) * WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_KWH;
    }

    return gramsPerKwh;
};

const AVG_DEVICE_LIFETIME_YEARS = 4;
const AVG_DEVICE_LIFETIME_SECONDS =
    AVG_DEVICE_LIFETIME_YEARS * 365.25 * 24 * 3600;

export const calculateDeviceEmissionsGramsPerSecond = (
    selectedDevices: Map<DeviceName, number>
) => {
    let totalPercentage = 0;
    let lifetimeEmissionsGrams = 0;

    selectedDevices.forEach((value, key) => {
        totalPercentage += value;
        lifetimeEmissionsGrams +=
            value * DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS[key];
    });

    if (totalPercentage < 1) {
        lifetimeEmissionsGrams +=
            (1 - totalPercentage) * AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS;
    }
    const gramsPerSecond = lifetimeEmissionsGrams / AVG_DEVICE_LIFETIME_SECONDS;

    return gramsPerSecond;
};
