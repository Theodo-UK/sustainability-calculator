import {
    REAL_LIFE_EXAMPLES,
    RealLifeExample,
} from "../../data/constants/RealLifeComparison";

const formatComparison = (emission: number, comparison: string): string => {
    const rounded_emission = Math.round(
        2 * (emission / REAL_LIFE_EXAMPLES[comparison])
    );
    const precision = rounded_emission % 2;
    return (rounded_emission / 2).toFixed(precision) + " " + comparison;
};

export type ComparisonType = {
    description: string;
    graphic: RealLifeExample;
};

export const getEmissionsComparison = (emissions: number): ComparisonType => {
    if (emissions > REAL_LIFE_EXAMPLES["Plastic Water Bottle"]) {
        return {
            description: formatComparison(emissions, "Plastic Water Bottle"),
            graphic: "Plastic Water Bottle",
        };
    }
    if (emissions > REAL_LIFE_EXAMPLES["Coffee Cup"]) {
        return {
            description: formatComparison(emissions, "Coffee Cup"),
            graphic: "Coffee Cup",
        };
    }
    if (emissions >= 0.995 * REAL_LIFE_EXAMPLES["Google Search"]) {
        return {
            description: formatComparison(emissions, "Google Search"),
            graphic: "Google Search",
        };
    }

    const percentGoogleSearch = (
        (emissions / REAL_LIFE_EXAMPLES["Google Search"]) *
        100
    ).toFixed(0);

    return {
        description: `${percentGoogleSearch}% Google Search`,
        graphic: "Google Search",
    };
};
