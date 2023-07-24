import React from "react";
import { CalculationDataType } from "../../../data/calculations/ICalculationsRepository";
import { getEmissionsComparison } from "../../../utils/helpers/getEmissionComparison";

export const EmissionsComparison = ({
    calculation,
}: {
    calculation: CalculationDataType;
}) => {
    return (
        <>
            {/* <img src={GoogleSearchIcon} alt="My Icon" /> */}
            <div className="my-4 border-l-2 border-l-myrtle-green flex flex-wrap content-center justify-center">
                {getEmissionsComparison(calculation.emissions)}
            </div>
        </>
    );
};
