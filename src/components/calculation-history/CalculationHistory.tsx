import React from "react";
import { CalculationData } from "../../data/calculations/ICalculationsRepository";
type CountryDropdownType = {
    refreshCalculationHistory: () => void;
    calculationHistory: CalculationData[];
};
export const CalculationHistory = ({
    refreshCalculationHistory,
    calculationHistory,
}: CountryDropdownType) => {
    return (
        <div>
            <button onClick={refreshCalculationHistory}>Refresh History</button>
            <ul>
                {calculationHistory.map((calculation, index) => (
                    <li key={index}>
                        <p>Bytes: {calculation.bytes}</p>
                        <p>Emissions: {calculation.emissions}</p>
                        <p>
                            Specific Emissions: {calculation.specificEmissions}
                        </p>
                        {/* Render the selected countries */}
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
