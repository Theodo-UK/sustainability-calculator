import React from "react";
import { Button } from "../button/Button";
import { CalculationDataType } from "../../../data/calculations/ICalculationsRepository";

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
                        <p>Bytes: {calculation.bytes}</p>
                        <p>Emissions: {calculation.emissions}</p>
                        <p>
                            Specific Emissions: {calculation.specificEmissions}
                        </p>
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
