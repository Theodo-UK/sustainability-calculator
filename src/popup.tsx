import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CountryDropdown } from './components/CountryDropdown'
import { calculateCarbon } from "./helpers/calculateCarbon";
import { usePopup } from "./components/usePopup";
import { SelectedCountries } from "./components/selected-countries/SelectedCountries";

export const Popup = () => {
  const {
    selectedCountries,
    addSelectedCountry,
    removeSelectedCountry,
    refreshAndGetSize,
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
        SCI: {calculateCarbon(selectedCountries)} gCO2eq
      </div>
      <SelectedCountries selectedCountries={selectedCountries} removeSelectedCountry={removeSelectedCountry}/>
      <CountryDropdown addSelectedCountry={addSelectedCountry} />
    </div>
  );
};

const rootElement = document.getElementById("react-target");
// @ts-ignore
createRoot(rootElement).render(<Popup />);
