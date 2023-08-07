import {
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
} from "../constants/DeviceEmissions";
const deviceNames = Object.keys(
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS
) as DeviceName[];

export const isSelectedDevicesMap = (
    data: unknown
): data is Map<DeviceName, number> => {
    if (!(data instanceof Map)) {
        return false;
    }

    const keys = Array.from(data.keys());
    const values = Array.from(data.values());

    if (
        keys.some((key) => !deviceNames.includes(key)) ||
        values.some((value) => typeof value !== "number")
    ) {
        return false;
    }

    return true;
};
