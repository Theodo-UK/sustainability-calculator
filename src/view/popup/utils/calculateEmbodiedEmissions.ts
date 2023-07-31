import {
    AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS
} from "../../../data/constants/DeviceEmissions";

const AVG_DEVICE_LIFETIME = (4 * 365 + 1) * 24 * 3600;

export const calculateEmbodiedEmissions = (
    flowLength: number,
    selectedDevices: Map<DeviceName, number>
): number => {
    const _selectedDevices = new Map(selectedDevices);

    let totalPercentage = 0;
    let carbon = 0;
    _selectedDevices.forEach((percentage, device) => {
        totalPercentage += percentage;
        carbon +=
            ((flowLength * DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS[device]) /
                AVG_DEVICE_LIFETIME) *
            percentage;
    });

    carbon +=
        ((flowLength * AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS) /
            AVG_DEVICE_LIFETIME) *
        (1 - totalPercentage);

    return carbon;
};
