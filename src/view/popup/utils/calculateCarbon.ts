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

const BYTES_PER_GB = 1073741824;
const MS_PER_HOUR = 3600000;

export const calculateEmissionsFromBytes = (
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

export const calculateEmissionsFromFlowTime = (
    flowtime: number,
    selectedDevices: Map<DeviceName, number>
): number => {
    const _selectedDevices = new Map(selectedDevices);

    let totalPercentage = 0;
    let carbon = 0;
    _selectedDevices.forEach((percentage, device) => {
        totalPercentage += percentage;
        carbon +=
            (flowtime / MS_PER_HOUR) *
            DEVICE_CO2_EMISSIONS_GRAMS_PER_HOUR[device] *
            percentage;
    });

    carbon +=
        (flowtime / MS_PER_HOUR) *
        WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_HOUR *
        (1 - totalPercentage);

    return carbon;
};
