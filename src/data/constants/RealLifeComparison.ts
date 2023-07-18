export const REAL_LIFE_EXAMPLES: Record<string, number> = {
    "Google Search": 0.2,
    "Coffee Cup": 21,
    "Plastic Water Bottle": 82,
};

export type RealLifeExample = keyof typeof REAL_LIFE_EXAMPLES;

const formatComparaison = (emission: number, comparison: string): string => {
    const rounded_emission = Math.round(
        2 * (emission / REAL_LIFE_EXAMPLES[comparison])
    );
    const precision = rounded_emission % 2;
    return (rounded_emission / 2).toFixed(precision) + " " + comparison;
};

export const getEmissionsComparison = (emissions: number): string => {
    if (emissions > REAL_LIFE_EXAMPLES["Plastic Water Bottle"]) {
        return formatComparaison(emissions, "Plastic Water Bottle");
    }
    if (emissions > REAL_LIFE_EXAMPLES["Coffee Cup"]) {
        return formatComparaison(emissions, "Coffee Cup");
    }
    if (emissions > REAL_LIFE_EXAMPLES["Google Search"]) {
        return formatComparaison(emissions, "Google Search");
    }

    return (
        ((emissions / REAL_LIFE_EXAMPLES["Google Search"]) * 100).toFixed(0) +
        "% " +
        "Google Search"
    );
};
