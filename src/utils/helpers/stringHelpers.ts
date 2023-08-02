export const removeWhiteSpace = (str: string): string =>
    str.replace(/\s+/g, "");

export const secondsToTimeString = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = remainingSeconds.toFixed(0).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
};
