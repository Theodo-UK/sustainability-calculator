import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { FormattedMessage } from "react-intl";
// import { Intl } from "./providers/Intl";
import { LocationDropdown, LocationType } from './components/LocationDropdown'
import { LOCATIONS } from "./constants/locations";

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
      console.log('popup: message received')
      console.log(`popup: ${message}`)
      console.log(message.transferSize)
      const accumalativeTransferSize = message.transferSize
      if (accumalativeTransferSize >= 0) {
        console.log('setting transfer size')
        setTransferSize(transferSize + accumalativeTransferSize);
        console.log(`popup: accumalativeTransferSize: ${accumalativeTransferSize}`)
      }
    });
  }, []);


  return (
    // <Intl defaultLocale="en">
    <div className="bg-black">
      {/* <FormattedMessage id={"homeScreen.title"} /> */}
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button onClick={() => refreshAndGetSize(selectedLocation)}>
        {/* <FormattedMessage id={"homeScreen.calculate"} /> */}
        Calculate
      </button>
      {/* <div >
          SCI: {Math.floor((transferSize / 1073741824) * 0.81 * selectedLocation.value)} gCO2eq
        </div> */}
      <div >
        SCI: {selectedLocation.value} gCO2eq
      </div>
      <LocationDropdown selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
    </div>
  ); {/* </Intl> */ }
};

const rootElement = document.getElementById("react-target");
// @ts-ignore
createRoot(rootElement).render(<Popup />);
