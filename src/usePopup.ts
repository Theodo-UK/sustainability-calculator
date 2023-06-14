import { LocationType } from "components/LocationDropdown";
import { LOCATIONS } from "constants/locations";
import { useEffect, useState } from "react";

export type PopupProps = {
    selectedLocation: LocationType;
    setSelectedLocation: (location: LocationType) => void;
    refreshAndGetSize: (selectedLocation: LocationType) => void;
}

export const usePopup = (): PopupProps => {
    const [transferSize, setTransferSize] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState<LocationType>(LOCATIONS[0])

    const refreshAndGetSize = () => {

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


    return {
        selectedLocation,
        setSelectedLocation,
        refreshAndGetSize,
    }

}