export const formatBytesString = (bytes: number, precision = 2): string => {
    if (!+bytes) return "0 Bytes";

    // Uncomment for decimal system
    const base = 1000;
    const units = ["B", "KB", "MB", "GB", "TB"];

    // Uncomment for binary system
    // const base = 1024;
    // const units = ["B", "KiB", "MiB", "GiB", "TiB"];

    const dm = precision < 0 ? 0 : precision;

    const i = Math.floor(Math.log(bytes) / Math.log(base + 1)); // = log_base(bytes)

    return `${parseFloat((bytes / Math.pow(base, i)).toFixed(dm))} ${units[i]}`;
};
