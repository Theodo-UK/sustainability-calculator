import React from "react";
import { CalculationDataType } from "../../../data/calculations/ICalculationsRepository";
import { getEmissionsComparison } from "../../../utils/helpers/getEmissionComparison";

import CoffeeCupPath from "../../../assets/coffee-cup.svg";
import GoogleSearchPath from "../../../assets/google-search.svg";
import PlasticBottlePath from "../../../assets/plastic-bottle.svg";
import { RealLifeExample } from "../../../data/constants/RealLifeComparison";
import { calculateEmissionsFromBytes } from "../../popup/utils/calculateCarbon";

export const EmissionsComparison = ({
    calculation,
}: {
    calculation: CalculationDataType;
}) => {
    const imageMap: Record<RealLifeExample, string> = {
        "Google Search": GoogleSearchPath,
        "Coffee Cup": CoffeeCupPath,
        "Plastic Water Bottle": PlasticBottlePath,
    };
    console.log("selectedCountries to compare:", calculation.selectedCountries);
    const comparison = getEmissionsComparison(
        calculateEmissionsFromBytes(
            calculation.bytes,
            calculation.selectedCountries
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
