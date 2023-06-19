import { useEffect, useState } from "react";
import { Countries, CountryName, WorldAverage } from "../constants/Countries";

export type PopupProps = {
    selectedCountries: Map<CountryName, number>;
    addSelectedCountry: (country: CountryName) => void;
    removeSelectedCountry: (country: CountryName) => void;
    setCountryPercentage: (country: CountryName, percentage: number) => void;
    averageSpecificEmissions: number;
    refreshAndGetSize: () => Promise<void>;
    error: string | null;
}

export const usePopup = (): PopupProps => {
    const [transferSize, setTransferSize] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<Map<CountryName, number>>(new Map<CountryName, number>())
    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const setCountryPercentage = (country: CountryName, percentage: number) => {
        const newMap = new Map(selectedCountries);
        newMap.set(country, percentage);
        setSelectedCountries(newMap);
    }

    const calculateAverageSpecificEmissions = () => {
        if (selectedCountries.size === 0) {
            setAverageSpecificEmissions(WorldAverage)
            return;
        }
        let totalPercentage = 0;
        let average = 0;
        let noOfMissingPercentages = 0;

        selectedCountries.forEach((value, key) => {
            totalPercentage += value;
            if (value === 0) {
                noOfMissingPercentages += 1;
                return;
            }
            average += value * Countries[key];
        });

        const remainingPercentage = 1 - totalPercentage;
        
        if (noOfMissingPercentages > 0) {
            selectedCountries.forEach((value, key) => {
                if (value !== 0) {
                    return;
                }
                average += remainingPercentage / noOfMissingPercentages * Countries[key];
            });
        } else if (totalPercentage < 1) {
            average += remainingPercentage * WorldAverage;
        }

        setAverageSpecificEmissions(average)

    }

    const sumPercentages = () => {
        let sum = 0;
        selectedCountries.forEach((country, value) => {
            sum = sum + country;
        });
        if (sum > 1) {
            throw new Error(`Error: The sum of the percentages is greater than 100%. Current sum: ${sum*100}%`);
        }
        return sum;
    }


    const refreshAndGetSize = async () => {
        try {
            sumPercentages();
            calculateAverageSpecificEmissions();
        } catch (e: any) {
            setError(e.message);
            return;
        }

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
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        error,
    }

}