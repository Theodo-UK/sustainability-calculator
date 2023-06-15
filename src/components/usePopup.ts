import { useEffect, useState } from "react";
import { CountryName, Countries } from "../constants/Countries";

export type PopupProps = {
    selectedCountry: CountryName;
    setSelectedCountry: (country: CountryName) => void;
    refreshAndGetSize: (selectedCountry: CountryName) => Promise<void>;
}



export const usePopup = (): PopupProps => {
    const [transferSize, setTransferSize] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState<CountryName>("United Kingdom")

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



    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
            const accumulative = message.transferSize
            if (accumulative >= 0) {
                setTransferSize(transferSize + accumulative);
            }
        });
    }, []);


    return {
        selectedCountry,
        setSelectedCountry,
        refreshAndGetSize,
    }

}