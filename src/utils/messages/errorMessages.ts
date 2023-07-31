export const percentageAboveHundredString = (percent: number): string =>
    `Error: The sum of the percentages is greater than 100%. Current sum: ${percent.toFixed(
        0
    )}%`;
