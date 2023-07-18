import React from "react";
import { createRoot } from "react-dom/client";
import { CountryDropdown } from "../components/country-dropdown/CountryDropdown";
import { Button } from "../components/atomic/Button";
import { usePopup } from "./usePopup";
import { SelectedCountries } from "../components/selected-countries/SelectedCountries";
import { CalculationHistory } from "../components/calculation-history/CalculationHistory";
import {
    formatEmissions,
    formatBytes,
} from "../../utils/helpers/formatNumbersToString";
import "./../../input.css";
import { getEmissionsComparison } from "../../data/constants/RealLifeComparison";

export const Popup = () => {
    const {
        bytesTransferred,
        emissions,
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        stopRecording,
        refreshCalculationHistory,
        calculationHistory,
        error,
    } = usePopup();

    return (
        <div className="p-10 w-80">
            <h1 className="text-3xl font-bold underline">
                Sustainability Calculator
            </h1>
            <Button onClick={() => refreshAndGetSize(false)}>
                Calculate CO2 emissions as returning user
            </Button>
            <Button onClick={() => refreshAndGetSize(true)}>
                Calculate CO2 emissions as new user
            </Button>
            <Button onClick={stopRecording} colour="red">
                Stop calculation
            </Button>
            <p>Total Data Received: {formatBytes(bytesTransferred)}</p>
            <p>
                Specific Carbon Emissions:
                {` ${formatEmissions(averageSpecificEmissions)} per gigabyte`}
            </p>
            <p>Software Carbon Intensity: {formatEmissions(emissions)}</p>
            <p>
                CO2 emissions are equivalent to:{" "}
                {getEmissionsComparison(emissions)}
            </p>
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
            <CountryDropdown addSelectedCountry={addSelectedCountry} />
            <CalculationHistory
                calculationHistory={calculationHistory}
                refreshCalculationHistory={refreshCalculationHistory}
            />
            {error && <p>{error}</p>}
        </div>
    );
};

const rootElement = document.getElementById("react-target");

if (!rootElement) {
    throw new Error("Couldn't find react target");
}

createRoot(rootElement).render(<Popup />);
