import React from "react";
import {
    HistoryContext,
    HistoryContextType,
} from "../../provider/history/HistoryProvider";
import { useNullSafeContext } from "../../provider/useNullSafeContext";
import { EmissionsComparison } from "./comparison/EmissionsComparison";
import { EmissionsSummary } from "./summary/EmissionsSummary";
export const Results = () => {
    const { calculationHistory } =
        useNullSafeContext<HistoryContextType>(HistoryContext);

    return (
        calculationHistory && (
            <div className=" h-32 grid grid-cols-2 text-base bg-nyanza rounded-2xl shadow font-medium">
                <EmissionsSummary />
                <EmissionsComparison calculation={calculationHistory[0]} />
            </div>
        )
    );
};
