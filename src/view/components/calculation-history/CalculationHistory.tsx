import React from "react";
import { FaClipboard } from "react-icons/fa";
import { CalculationDataType } from "../../../data/calculations/ICalculationsRepository";
import {
    formatBytes,
    formatEmissions,
    msToDateTimeStrings,
} from "../../../utils/helpers/formatNumbersToString";
import { Button } from "../atomic/Button";

type CountryDropdownType = {
    calculationHistory: CalculationDataType[];
};

export const CalculationHistory = ({
    calculationHistory,
}: CountryDropdownType) => {
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
                    {calculationHistory.map((calculation, index) => {
                        const [day, time] = msToDateTimeStrings(
                            calculation.unixTimeMs
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
