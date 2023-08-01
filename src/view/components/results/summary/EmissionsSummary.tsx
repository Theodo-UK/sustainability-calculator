import React from "react";
import {
    formatBytes,
    formatEmissions,
} from "../../../../utils/helpers/formatNumbersToString";
import {
    HistoryContext,
    HistoryContextType,
} from "../../../provider/history/HistoryProvider";
import { useNullSafeContext } from "../../../provider/useNullSafeContext";

export const EmissionsSummary = () => {
    const { calculationHistory } =
        useNullSafeContext<HistoryContextType>(HistoryContext);
    if (!calculationHistory) {
        return <div>Loading...</div>;
    }
    return (
        <p className="text-center flex flex-wrap content-center justify-center">
            {formatBytes(calculationHistory[0].bytes)}
            <br />
            {`${formatEmissions(calculationHistory[0].specificEmissions)}
        gCO2/GB`}
            <br />
            {`${formatEmissions(calculationHistory[0].emissions)} g of CO2`}
        </p>
    );
};
