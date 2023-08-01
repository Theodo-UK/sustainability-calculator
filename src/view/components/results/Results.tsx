import React from "react";
import {
    formatBytes,
    formatEmissions,
} from "../../../utils/helpers/formatNumbersToString";
import {
    HistoryContext,
    HistoryContextType,
} from "../../provider/history/HistoryProvider";
import { useNullSafeContext } from "../../provider/useNullSafeContext";
import { EmissionsComparison } from "../emissions-comparison/EmissionsComparison";
export const Results = () => {
    const { calculationHistory } =
        useNullSafeContext<HistoryContextType>(HistoryContext);
    return (
        <div className=" h-32 grid grid-cols-2 text-base bg-nyanza rounded-2xl shadow font-medium">
            <p className="text-center flex flex-wrap content-center justify-center">
                {formatBytes(calculationHistory[0].bytes)}
                <br />
                {`${formatEmissions(calculationHistory[0].specificEmissions)}
                        gCO2/GB`}
                <br />
                {`${formatEmissions(calculationHistory[0].emissions)} g of CO2`}
            </p>
            <EmissionsComparison calculation={calculationHistory[0]} />
        </div>
    );
};
