import React from "react";
import { CalculationDataType } from "../../../data/calculations/ICalculationsRepository";
import {
    formatBytes,
    formatEmissions,
} from "../../../utils/helpers/formatNumbersToString";
import { getEmissionsComparison } from "../../../utils/helpers/getEmissionComparison";
import { Button } from "../../components/atomic/Button";
import { CalculationHistory } from "../../components/calculation-history/CalculationHistory";
import { SelectedCountriesDisclosure } from "../../components/countries/SelectedCountriesDisclosure";

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
    error: string | undefined;
};

export const ResultsPage = ({
    onRestartButtonPress,
    recordings,
    selectedCountries,
    addSelectedCountry,
    removeSelectedCountry,
    setCountryPercentage,
    error,
}: ResultsPageProps) => {
    return (
        <>
            <h1 className="text-2xl font-bold text-center">
                Sustainability Calculator
            </h1>
            <SelectedCountriesDisclosure
                selectedCountries={selectedCountries}
                addSelectedCountry={addSelectedCountry}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
            <div className=" h-32 grid grid-cols-2 text-base bg-nyanza rounded-2xl shadow font-medium">
                <p className="text-center flex flex-wrap content-center justify-center">
                    {formatBytes(recordings[0].bytes)}
                    <br />
                    {`${formatEmissions(recordings[0].specificEmissions)}
                        gCO2/GB`}
                    <br />
                    {`${formatEmissions(recordings[0].emissions)} g of CO2`}
                </p>
                <div className="my-4 border-l-2 border-l-myrtle-green flex flex-wrap content-center justify-center">
                    {getEmissionsComparison(recordings[0].emissions)}
                </div>
            </div>
            <Button onClick={onRestartButtonPress} colour="light-green">
                Restart recording
            </Button>
            <CalculationHistory calculationHistory={recordings} />
            {error && <p>{error}</p>}
        </>
    );
};
