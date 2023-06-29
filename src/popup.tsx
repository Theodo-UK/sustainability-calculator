import React from "react";
import { createRoot } from "react-dom/client";
import { CountryDropdown } from "./components/CountryDropdown";
import { usePopup } from "./components/usePopup";
import { SelectedCountries } from "./components/selected-countries/SelectedCountries";

export const Popup = () => {
    const {
        totalBytesReceived,
        emissions,
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        stopRecording,
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
            <p>Total Data Received: {totalBytesReceived} bytes</p>
            <p>
                Specific Carbon Emissions (grams of C02 per gigabyte):{" "}
                {Math.round(averageSpecificEmissions * 100) / 100}
            </p>
            <p>
                Software Carbon Intensity: {Math.round(emissions * 100) / 100}{" "}
                grams of CO2
            </p>
            <SelectedCountries
                selectedCountries={selectedCountries}
                removeSelectedCountry={removeSelectedCountry}
                setCountryPercentage={setCountryPercentage}
            />
            <CountryDropdown addSelectedCountry={addSelectedCountry} />
            {error && <p>{error}</p>}
        </div>
    );
};

const rootElement = document.getElementById("react-target");

if (!rootElement) {
    throw new Error("Couldn't find react target");
}

createRoot(rootElement).render(<Popup />);
