import { format } from "path";

export const formatBytesString = (bytes: number): string => {
    if (!+bytes) return "0 Bytes";

    // Uncomment for decimal system
    const base = 1000;
    const units = ["B", "KB", "MB", "GB", "TB"];

    // Uncomment for binary system
    // const base = 1024;
    // const units = ["B", "KiB", "MiB", "GiB", "TiB"];

    let i = 0;
    while (bytes >= base && i < units.length - 1) {
        bytes /= base;
        i++;
        if (i > units.length - 1) break;
    }
    const roundedBytes = Math.round(bytes);
    if (roundedBytes.toFixed(0).length > 3) {
        // Edge case where rounding brings it up to next unit, e.g. 999999 B -> 999.999 KB -> 1000 KB instead of 1 MB
        return `${(roundedBytes / base).toFixed(0)} ${units[i + 1]}`;
    }

    return `${bytes.toFixed(0)} ${units[i]}`;
};
