import { useEffect, useState } from "react";
import { CountryName } from "../constants/Countries";

export type PopupProps = {
    selectedCountries: Set<CountryName>;
    addToSelectedCountries: (country: CountryName) => void;
    refreshAndGetSize: (selectedCountry: Set<CountryName>) => Promise<void>;
}

export const usePopup = (): PopupProps => {
    const [transferSize, setTransferSize] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<Set<CountryName>>(new Set())

    const refreshAndGetSize = async () => {

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

    const addToSelectedCountries = (country: CountryName) => {
        const newSet = new Set(selectedCountries);
        newSet.add(country);
        setSelectedCountries(newSet);
        console.log("adding country, new set: ", selectedCountries);
    }



    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
            const accumulative = message.transferSize
            if (accumulative >= 0) {
                setTransferSize(transferSize + accumulative);
            }
        });
    }, []);


    return {
        selectedCountries,
        addToSelectedCountries,
        refreshAndGetSize,
    }

}