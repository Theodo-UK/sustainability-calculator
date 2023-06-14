import React from "react";
import { createRoot } from "react-dom/client";
import { LocationDropdown } from './components/LocationDropdown'
import { calculateCarbon } from "./helpers/calculateCarbon";
import { usePopup } from "usePopup";


export const Popup = () => {
  const {
    selectedLocation,
    setSelectedLocation,
    refreshAndGetSize,
  } = usePopup();

  return (
    <div className="bg-black">
      <h1 className="text-3xl font-bold underline">
        Sustainability Calculator
      </h1>
      <button onClick={() => refreshAndGetSize(selectedLocation)}>
        Calculate CO2 emissions
      </button>
      <div >
        SCI: {calculateCarbon(selectedLocation)} gCO2eq
      </div>
      <LocationDropdown selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
    </div>
  );
};

const rootElement = document.getElementById("react-target");
// @ts-ignore
createRoot(rootElement).render(<Popup />);
