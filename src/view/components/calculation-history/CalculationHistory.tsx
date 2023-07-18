import React from "react";
import { Button } from "../atomic/Button";
import { CalculationDataType } from "../../../data/calculations/ICalculationsRepository";
import {
    formatBytes,
    formatEmissions,
    unixTimeToDate,
} from "../../../utils/helpers/formatNumbersToString";

type CountryDropdownType = {
    refreshCalculationHistory: () => void;
    calculationHistory: CalculationDataType[];
};

export const CalculationHistory = ({
    refreshCalculationHistory,
    calculationHistory,
}: CountryDropdownType) => {
    return (
        <div>
            <Button onClick={refreshCalculationHistory} colour="green">
                Refresh History
            </Button>
            <ul>
                {calculationHistory.map((calculation, index) => (
                    <li key={index}>
                        <p>Bytes: {formatBytes(calculation.bytes)}</p>
                        <p>
                            Emissions: {formatEmissions(calculation.emissions)}
                        </p>
                        <p>
                            Specific Emissions:{" "}
                            {formatEmissions(calculation.specificEmissions)}
                        </p>
                        <p>
                            Date & Time:{" "}
                            {unixTimeToDate(calculation.unixTimeMs)}
                        </p>
                        <p>User: {calculation.userType}</p>
                        <ul>
                            {Array.from(calculation.selectedCountries).map(
                                ([countryName, percentage]) => (
                                    <li key={countryName}>
                                        {countryName}: {percentage}
                                    </li>
                                )
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};
