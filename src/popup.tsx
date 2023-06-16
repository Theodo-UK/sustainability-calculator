import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CountryDropdown } from './components/CountryDropdown'
import { calculateCarbon } from "./helpers/calculateCarbon";
import { usePopup } from "./components/usePopup";
import { SelectedCountries } from "./components/selected-countries/SelectedCountries";
import { CountryName } from "./constants/Countries";


export const Popup = () => {
  const {
    selectedCountry,
    setSelectedCountry,
    refreshAndGetSize,
  } = usePopup();

  const [selectedCountries, setSelectedCountries] = useState<Set<CountryName>>(new Set())


  return (
    <div className="bg-black">
      <h1 className="text-3xl font-bold underline">
        Sustainability Calculator
      </h1>
      <button onClick={() => refreshAndGetSize(selectedCountry)}>
        Calculate CO2 emissions
      </button>
      <div >
        SCI: {calculateCarbon(selectedCountry)} gCO2eq
      </div>
      <SelectedCountries selectedCountries={selectedCountries}/>
      <CountryDropdown setSelectedCountry={setSelectedCountry} />
    </div>
  );
};

const rootElement = document.getElementById("react-target");
// @ts-ignore
createRoot(rootElement).render(<Popup />);
