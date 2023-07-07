import React from "react";
import { createRoot } from "react-dom/client";
import { CountryDropdown } from "./components/CountryDropdown";
import { usePopup } from "./usePopup";
import { SelectedCountries } from "./components/selected-countries/SelectedCountries";
import { CalculationHistory } from "./components/calculation-history/CalculationHistory";
import { formatBytesString } from "./helpers/formatBytesString";

export const Popup = () => {
    const {
        totalBytesTransferred,
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
        <div className="bg-black">
            <h1 className="text-3xl font-bold underline">
                Sustainability Calculator
            </h1>
            <button onClick={() => refreshAndGetSize(false)}>
                Calculate CO2 emissions as returning user
            </button>
            <button onClick={() => refreshAndGetSize(true)}>
                Calculate CO2 emissions as new user
            </button>
            <button onClick={() => stopRecording()}>Stop calculation</button>
            <p>
                Total Data Received: {formatBytesString(totalBytesTransferred)}
            </p>
            <p>
                Specific Carbon Emissions:
                {` ${averageSpecificEmissions.toFixed(
                    0
                )} grams of C02 per gigabyte`}
            </p>
            <p>
                Software Carbon Intensity:
                {` ${emissions.toFixed(2)} grams of CO2`}
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
