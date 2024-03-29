export function formatEmissions(emissions: number): string {
    return emissions.toFixed(2);
}

export const formatBytes = (bytes: number): string => {
    if (!+bytes) return "0 Bytes";

    const BASE = 1000;
    const units = ["B", "KB", "MB", "GB", "TB"];

    let i = 0;
    while (bytes >= BASE && i < units.length - 1) {
        bytes /= BASE;
        i++;
        if (i > units.length - 1) break;
    }

    const roundedBytes = Math.round(bytes);
    const decimalPlaces = i === 0 ? 0 : 2;
    if (roundedBytes.toFixed(0).length > 3) {
        return `${(roundedBytes / BASE).toFixed(decimalPlaces)} ${
            units[i + 1]
        }`;
    }

    return `${bytes.toFixed(decimalPlaces)} ${units[i]}`;
};

export function msToDateTimeStrings(unixTimeMs: number): [string, string] {
    const date = new Date(unixTimeMs);
    const day = date.toLocaleDateString("en-GB", { timeZone: "UTC" });
    const time = date.toLocaleTimeString("en-GB", { timeZone: "UTC" });
    return [day, time];
}
