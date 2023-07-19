import { REAL_LIFE_EXAMPLES } from "../../data/constants/RealLifeComparison";

const formatComparison = (emission: number, comparison: string): string => {
    const rounded_emission = Math.round(
        2 * (emission / REAL_LIFE_EXAMPLES[comparison])
    );
    const precision = rounded_emission % 2;
    return (rounded_emission / 2).toFixed(precision) + " " + comparison;
};

export const getEmissionsComparison = (emissions: number): string => {
    if (emissions > REAL_LIFE_EXAMPLES["Plastic Water Bottle"]) {
        return formatComparison(emissions, "Plastic Water Bottle");
    }
    if (emissions > REAL_LIFE_EXAMPLES["Coffee Cup"]) {
        return formatComparison(emissions, "Coffee Cup");
    }
    if (emissions > REAL_LIFE_EXAMPLES["Google Search"]) {
        return formatComparison(emissions, "Google Search");
    }

    return (
        ((emissions / REAL_LIFE_EXAMPLES["Google Search"]) * 100).toFixed(0) +
        "% " +
        "Google Search"
    );
};
