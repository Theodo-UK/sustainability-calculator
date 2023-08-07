import React from "react";

import CoffeeCupPath from "../../../../assets/coffee-cup.svg";
import GoogleSearchPath from "../../../../assets/google-search.svg";
import PlasticBottlePath from "../../../../assets/plastic-bottle.svg";
import { CalculationData } from "../../../../data/calculations/CalculationData";
import { RealLifeExample } from "../../../../data/constants/RealLifeComparison";
import { calculateEmissionsHelper } from "../../../../utils/helpers/calculateEmissions";
import { getEmissionsComparison } from "../../../../utils/helpers/getEmissionComparison";

export const EmissionsComparison = ({
    calculation,
}: {
    calculation: CalculationData;
}) => {
    const imageMap: Record<RealLifeExample, string> = {
        "Google Search": GoogleSearchPath,
        "Coffee Cup": CoffeeCupPath,
        "Plastic Water Bottle": PlasticBottlePath,
    };
    const comparison = getEmissionsComparison(
        calculateEmissionsHelper(
            calculation.bytes,
            calculation.selectedCountries,
            calculation.selectedDevices,
            calculation.endUnixTimeMs,
            calculation.startUnixTimeMs
        )
    );
    return (
        <>
            <div className="my-4 border-l-2 border-l-myrtle-green flex flex-col items-center justify-center">
                <img
                    src={`${imageMap[comparison.graphic]}`}
                    alt="My Icon"
                    className="w-8 h-8 mx-auto"
                    data-testid={comparison.graphic}
                />
                <p className="text-center flex flex-wrap content-center justify-center">
                    {comparison.description}
                </p>
            </div>
        </>
    );
};
