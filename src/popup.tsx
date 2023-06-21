import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CountryDropdown } from './components/CountryDropdown'
import { calculateCarbon } from "./helpers/calculateCarbon";
import { usePopup } from "./components/usePopup";
import { SelectedCountries } from "./components/selected-countries/SelectedCountries";

export const Popup = () => {
  const {
    transferSize,
    emissions,
    selectedCountries,
    addSelectedCountry,
    removeSelectedCountry,
    setCountryPercentage,
    averageSpecificEmissions,
    refreshAndGetSize,
    error,
  } = usePopup();



  return (
    <div className="bg-black">
      <h1 className="text-3xl font-bold underline">
        Sustainability Calculator
      </h1>
      <button onClick={() => refreshAndGetSize()}>
        Calculate CO2 emissions
      </button>
      <div >
        Total Data Received: {transferSize} bytes
      </div>
      <div >
        Specific Carbon Emissions (grams of C02 per byte): {Math.round(averageSpecificEmissions * 100) / 100}
      </div>
      <div >
        Software Carbon Intensity: {Math.round(emissions * 100) / 100} grams of CO2
      </div>
      <SelectedCountries selectedCountries={selectedCountries} removeSelectedCountry={removeSelectedCountry} setCountryPercentage={setCountryPercentage} />
      <CountryDropdown addSelectedCountry={addSelectedCountry} />
      {error && <div>{error}</div>}
    </div>
  );
};

const rootElement = document.getElementById("react-target");
// @ts-ignore
createRoot(rootElement).render(<Popup />);
