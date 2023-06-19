import { useEffect, useState } from "react";
import { CountryName } from "../constants/Countries";

export type PopupProps = {
    selectedCountries: Map<CountryName, number>;
    addSelectedCountry: (country: CountryName) => void;
    removeSelectedCountry: (country: CountryName) => void;
    refreshAndGetSize: () => Promise<void>;
}

export const usePopup = (): PopupProps => {
    const [transferSize, setTransferSize] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<Map<CountryName, number>>(new Map<CountryName, number>())

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

    const addSelectedCountry = (country: CountryName) => {
        const newMap = new Map(selectedCountries);
        if (newMap.has(country)) {
            return
        }
        newMap.set(country, 0);
        setSelectedCountries(newMap);
    }
    const removeSelectedCountry = (country: CountryName) => {
        const newMap = new Map(selectedCountries);
        if (!newMap.has(country)) {
            return
        }
        newMap.delete(country);
        setSelectedCountries(newMap);
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
        addSelectedCountry,
        removeSelectedCountry,
        refreshAndGetSize,
    }

}