const AVG_DEVICE_LIFETIME_YEARS = 4;
export const AVG_DEVICE_LIFETIME_SECONDS =
    AVG_DEVICE_LIFETIME_YEARS * 365.25 * 24 * 3600;

export const DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS: Record<string, number> = {
    Android: 71075,
    "Google Pixel 2": 66400,
    "Google Pixel 2 XL": 71500,
    "Google Pixel 3a": 45000,
    "Google Pixel 3a XL": 50000,
    "Google Pixel 4": 75000,
    "Google Pixel 4 XL": 80000,
    "Google Pixel 4a": 45000,
    "Google Pixel 5": 85000,
    "Google Pixel 6": 85000,
    "Google Pixel 6 Pro": 95000,
    "Google Pixel 7": 70000,
    "Google Pixel 7 Pro": 85000,
    Ipad: 87428.6,
    "iPad (10th gen)": 72000,
    "iPad (9th gen)": 75000,
    "iPad Air (4th gen)": 82000,
    "iPad Air (5th gen)": 80000,
    "iPad Mini (6th gen)": 68000,
    "iPad Pro 11-in (4th gen)": 100000,
    "iPad Pro 12.9-in (6th gen)": 135000,
    iPhone: 70812.5,
    "iPhone 11": 72000,
    "iPhone 11 Pro": 80000,
    "iPhone 11 Pro Max": 86000,
    "iPhone 12": 70000,
    "iPhone 12 Mini": 64000,
    "iPhone 12 Pro": 82000,
    "iPhone 12 Pro Max": 86000,
    "iPhone 7": 56000,
    "iPhone 7 Plus": 67000,
    "iPhone 8": 57000,
    "iPhone 8 Plus": 68000,
    "iPhone SE (2nd gen)": 57000,
    "iPhone X": 79000,
    "iPhone XR": 62000,
    "iPhone XS": 70000,
    "iPhone XS Max": 77000,
    Mac: 260363,
    Windows: 305548,
};

export const AVERAGE_DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS =
    Object.values(DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS).reduce(
        (sum, value) => sum + value,
        0
    ) / Object.values(DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS).length;

export type DeviceName = keyof typeof DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS;
