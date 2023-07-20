import React from "react";
import { Button } from "../../components/atomic/Button";
import {
    formatBytes,
    formatEmissions,
} from "../../../utils/helpers/formatNumbersToString";
import { getEmissionsComparison } from "../../../utils/helpers/getEmissionComparison";
import { CalculationDataType } from "data/calculations/ICalculationsRepository";
import { CalculationHistory } from "../../components/calculation-history/CalculationHistory";
import { CountryDropdown } from "../../components/country-dropdown/CountryDropdown";
import { SelectedCountries } from "../../components/selected-countries/SelectedCountries";

type ResultsPageProps = {
    onRestartButtonPress: () => void;
    recordings: CalculationDataType[];
    selectedCountries: Map<string, number>;
    addSelectedCountry: (country: string) => Promise<void>;
    removeSelectedCountry: (country: string) => Promise<void>;
    setCountryPercentage: (
        country: string,
        percentage: number
    ) => Promise<void>;
    refreshCalculationHistory: () => Promise<void>;
    error: string | undefined;
};

export const ResultsPage = ({
    onRestartButtonPress,
    recordings,
    selectedCountries,
    addSelectedCountry,
    removeSelectedCountry,
    setCountryPercentage,
    refreshCalculationHistory,
    error,
}: ResultsPageProps) => {
    return (
        <div className="p-10 w-80">
            <h1 className="text-3xl font-bold underline">
                Sustainability Calculator
            </h1>
            <p>Total Data Received: {formatBytes(recordings[0].bytes)}</p>
            <p>
                Specific Carbon Emissions:
                {` ${formatEmissions(
                    recordings[0].specificEmissions
                )} per gigabyte`}
            </p>
            <p>
                Software Carbon Intensity:{" "}
                {formatEmissions(recordings[0].emissions)}
            </p>
            <p>
                CO2 emissions are equivalent to:{" "}
                {getEmissionsComparison(recordings[0].emissions)}
            </p>
            <Button onClick={onRestartButtonPress} colour="red">
                Restart recording
            </Button>
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
            <CountryDropdown addSelectedCountry={addSelectedCountry} />
            <CalculationHistory
                calculationHistory={recordings}
                refreshCalculationHistory={refreshCalculationHistory}
            />
            {error && <p>{error}</p>}
        </div>
    );
};
