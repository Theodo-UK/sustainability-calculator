import React from "react";
import {
    calculateDeviceEmissionsGramsPerSecond,
    calculateEmissionsHelper,
    calculateLocationEmissionsGramsPerKwh,
} from "../../../../utils/helpers/calculateEmissions";
import {
    formatBytes,
    formatEmissions,
} from "../../../../utils/helpers/formatNumbersToString";
import { secondsToTimeString } from "../../../../utils/helpers/stringHelpers";
import {
    HistoryContext,
    HistoryContextType,
} from "../../../provider/history/HistoryProvider";
import { useNullSafeContext } from "../../../provider/useNullSafeContext";

export const EmissionsSummary = () => {
    const { calculationHistory } =
        useNullSafeContext<HistoryContextType>(HistoryContext);

    return (
        calculationHistory && (
            <p className="text-center flex flex-wrap content-center justify-center">
                {formatBytes(calculationHistory[0].bytes)}
                <br />
                {`${formatEmissions(
                    calculateEmissionsHelper(
                        calculationHistory[0].bytes,
                        calculationHistory[0].selectedCountries,
                        calculationHistory[0].selectedDevices,
                        calculationHistory[0].endUnixTimeMs,
                        calculationHistory[0].startUnixTimeMs
                    )
                )}
        gCO2/kWh`}
                <br />
                {`${formatEmissions(
                    calculateLocationEmissionsGramsPerKwh(
                        calculationHistory[0].selectedCountries
                    )
                )} g per kWh`}
                <br />
                {`${formatEmissions(
                    calculateDeviceEmissionsGramsPerSecond(
                        calculationHistory[0].selectedDevices
                    ) * 1000
                )} mg per second`}
                <br />
                {`Flow Time: ${secondsToTimeString(
                    (calculationHistory[0].endUnixTimeMs -
                        calculationHistory[0].startUnixTimeMs) /
                        1000
                )}`}
            </p>
        )
    );
};
