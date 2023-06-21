import { useEffect, useState } from "react";
import { COUNTRIES, CountryName } from "../constants/Countries";
import { calculateAverageSpecificEmissionsHelper } from "../helpers/calculateAverageSpecificEmissions";

export type PopupProps = {
    selectedCountries: Map<CountryName, number>;
    addSelectedCountry: (country: CountryName) => void;
    removeSelectedCountry: (country: CountryName) => void;
    setCountryPercentage: (country: CountryName, percentage: number) => void;
    averageSpecificEmissions: number;
    refreshAndGetSize: () => Promise<void>;
    error?: string;
}

export const usePopup = (): PopupProps => {
    const [transferSize, setTransferSize] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<Map<CountryName, number>>(new Map<CountryName, number>([["World Average", 0]]))
    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [error, setError] = useState<string>();

    const setCountryPercentage = (country: CountryName, percentage: number) => {
        const newMap = new Map(selectedCountries);
        newMap.set(country, percentage);
        setSelectedCountries(newMap);
    }

    const calculateAverageSpecificEmissions = () => {
        if (selectedCountries.size === 0) {
            setAverageSpecificEmissions(COUNTRIES["World Average"])
            return;
        }

        const newAverageSpecificEmissions = calculateAverageSpecificEmissionsHelper(selectedCountries);
        setAverageSpecificEmissions(newAverageSpecificEmissions)

    }

    const sumPercentages = () => {
        const percentage = Array.from(selectedCountries.values()).reduce((accumulator, country) => {
            return accumulator + country;
        }, 0);

        if (percentage > 1) {
            throw new Error(`Error: The sum of the percentages is greater than 100%. Current sum: ${percentage * 100}%`);
        }

        return percentage;
    }


    const refreshAndGetSize = async () => {
        try {
            sumPercentages();
            calculateAverageSpecificEmissions();
        } catch (e: any) {
            setError(e.message);
            return;
        }
        try {
            chrome.storage.local.set({["totalTransferSize"]: 0});
        } catch (e: any) {
            setError(e.message);
            return;
        } 
        console.log("cleared totalTransferSize")


        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tabId = tabs[0].id;
                // @ts-ignore
                chrome.tabs.reload(tabId, () => {
                    console.log("reloading tab")
                    chrome.runtime.sendMessage({ command: "getTransferSize", tabId });
                    // setTimeout(() => {
                    //     console.log("sending getTransferSize message from usePopup")
                    //     chrome.runtime.sendMessage({ command: "getTransferSize", tabId });
                    // }, 2000);
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
        
    }, []);


    return {
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        error,
    }

}