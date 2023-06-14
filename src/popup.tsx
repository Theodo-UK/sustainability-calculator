import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { LocationDropdown, LocationType } from './components/LocationDropdown'
import { LOCATIONS } from "./constants/locations";
import { calculateCarbon } from "./helpers/calculateCarbon";


export const Popup = () => {
  const [transferSize, setTransferSize] = useState(0);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationType>(LOCATIONS[0])

  const refreshAndGetSize = (selectedLocation: LocationType) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        // @ts-ignore
        chrome.tabs.reload(tabId, () => {
          setTimeout(() => {
            chrome.runtime.sendMessage({ command: "getTransferSize", tabId });
          }, 2000);
        });
      }
    });
  };



  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      const accumalativeTransferSize = message.transferSize
      if (accumalativeTransferSize >= 0) {
        setTransferSize(transferSize + accumalativeTransferSize);
      }
    });
  }, []);


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
