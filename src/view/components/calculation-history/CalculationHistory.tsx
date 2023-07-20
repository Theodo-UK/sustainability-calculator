import React from "react";
import { CalculationDataType } from "../../../data/calculations/ICalculationsRepository";
import {
    formatBytes,
    formatEmissions,
    unixTimeToDateString,
} from "../../../utils/helpers/formatNumbersToString";

type CountryDropdownType = {
    calculationHistory: CalculationDataType[];
};

export const CalculationHistory = ({
    calculationHistory,
}: CountryDropdownType) => {
    return (
        <div>
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
                            {unixTimeToDateString(calculation.unixTimeMs)}
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
