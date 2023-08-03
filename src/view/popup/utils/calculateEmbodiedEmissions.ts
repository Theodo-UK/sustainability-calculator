import {
    AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS
} from "../../../data/constants/DeviceEmissions";

const AVG_DEVICE_LIFETIME_YEARS = 4;
const AVG_DEVICE_LIFETIME_SECONDS =
    AVG_DEVICE_LIFETIME_YEARS * 365.25 * 24 * 3600;

export const calculateEmbodiedEmissions = (
    flowLengthSeconds: number,
    selectedDevices: Map<DeviceName, number>
): number => {
    const _selectedDevices = new Map(selectedDevices);

    let totalPercentage = 0;
    let carbon = 0;
    _selectedDevices.forEach((percentage, device) => {
        totalPercentage += percentage;
        carbon +=
            ((flowLengthSeconds * DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS[device]) /
                AVG_DEVICE_LIFETIME_SECONDS) *
            percentage;
    });

    carbon +=
        ((flowLengthSeconds * AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS) /
            AVG_DEVICE_LIFETIME_SECONDS) *
        (1 - totalPercentage / 100);

    return carbon;
};
