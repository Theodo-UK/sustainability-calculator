export const formatBytesString = (bytes: number): string => {
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
    if (roundedBytes.toFixed(0).length > 3) {
        return `${(roundedBytes / BASE).toFixed(0)} ${units[i + 1]}`;
    }

    return `${bytes.toFixed(0)} ${units[i]}`;
};
