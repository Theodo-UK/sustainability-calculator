export const WORLD_AVERAGE_CO2_EMISSIONS_GRAMS_PER_HOUR = 421;

export const DEVICE_CO2_EMISSIONS_GRAMS_PER_HOUR: Record<string, number> = {
    "MacBook Pro": 212.3,
    "Windows Phone": 111.2,
    "Samsung Galaxy": 161.9,
};

export type DeviceName = keyof typeof DEVICE_CO2_EMISSIONS_GRAMS_PER_HOUR;
