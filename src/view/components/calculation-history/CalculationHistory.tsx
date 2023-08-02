import React from "react";
import { FaClipboard } from "react-icons/fa";
import {
    formatBytes,
    formatEmissions,
    msToDateTimeStrings,
} from "../../../utils/helpers/formatNumbersToString";
import { secondsToTimeString } from "../../../utils/helpers/stringHelpers";
import {
    HistoryContext,
    HistoryContextType,
} from "../../provider/history/HistoryProvider";
import { useNullSafeContext } from "../../provider/useNullSafeContext";
import { Button } from "../atomic/Button";

export const CalculationHistory = () => {
    const { calculationHistory } =
        useNullSafeContext<HistoryContextType>(HistoryContext);
    const [isListClosed, setIsListClosed] = React.useState(true);
    const handleViewHistoryButtonPress = () => setIsListClosed(false);

    return (
        <>
            {isListClosed ? (
                <Button
                    colour="light-green"
                    type="text"
                    onClick={handleViewHistoryButtonPress}
                >
                    <div className="flex flex-row gap-2 items-center">
                        <FaClipboard />
                        <p>View History</p>
                    </div>
                </Button>
            ) : (
                <ul className="overflow-y-scroll h-96 rounded-2xl shadow bg-nyanza p-4">
                    <h2 className="font-semibold text-center mb-2 text-lg">
                        Calculation History
                    </h2>
                    {calculationHistory?.map((calculation, index) => {
                        const [day, time] = msToDateTimeStrings(
                            calculation.endUnixTimeMs
                        );
                        return (
                            <li
                                key={index}
                                className="p-2 rounded-2xl hover:shadow-inner transition-shadow duration-200"
                            >
                                <h3 className="font-semibold">
                                    {`Recording n°${
                                        calculationHistory.length - index
                                    }:`}
                                </h3>
                                <p className="ml-4 mb-2">
                                    {`On the ${day} at ${time} UTC`}
                                    <br />
                                    {`As a ${calculation.userType}`}
                                    <br />
                                    {`Bytes: ${formatBytes(calculation.bytes)}`}
                                    <br />
                                    {`Emissions: ${formatEmissions(
                                        calculation.emissions
                                    )} g of CO2`}
                                    <br />
                                    {`Specific Emissions: ${formatEmissions(
                                        calculation.specificEmissions
                                    )} g of CO2`}
                                    <br />
                                    {`Flow Time: ${secondsToTimeString(
                                        (calculation.endUnixTimeMs -
                                            calculation.startUnixTimeMs) /
                                            1000
                                    )}`}
                                </p>
                                <ul>
                                    {Array.from(
                                        calculation.selectedCountries
                                    ).map(([countryName, percentage]) => (
                                        <li key={countryName}>
                                            {countryName}: {percentage}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};
