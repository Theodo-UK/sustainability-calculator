import { useEffect, useState } from "react";
import { CountryName } from "../constants/Countries";
import { calculateAverageSpecificEmissionsHelper } from "../helpers/calculateAverageSpecificEmissions";
import { calculateCarbon } from "../helpers/calculateCarbon";
import { ISelectedCountriesRepository } from "../data/selected_countries/ISelectedCountriesRepository";
import { useMountEffect } from "../helpers/useOnceAfterFirstMount";
import { IEmissionsRepository } from "../data/emissions/IEmissionsRepository";

export type PopupProps = {
    totalBytesReceived: number;
    emissions: number;
    selectedCountries: Map<CountryName, number>;
    addSelectedCountry: (country: CountryName) => void;
    removeSelectedCountry: (country: CountryName) => void;
    setCountryPercentage: (country: CountryName, percentage: number) => void;
    averageSpecificEmissions: number;
    refreshAndGetSize: (bypassCache: boolean) => Promise<void>;
    error?: string;
};

export const usePopup = (): PopupProps => {
    const selectedCountriesRepository: ISelectedCountriesRepository =
        ISelectedCountriesRepository.instance;
    const emissionsRepository: IEmissionsRepository =
        IEmissionsRepository.instance;

    const [totalBytesReceived, setTotalBytesReceived] = useState(0);
    const [emissions, setEmissions] = useState(0);
    const [selectedCountries, setSelectedCountries] = useState<
        Map<CountryName, number>
    >(new Map<CountryName, number>());
    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [error, setError] = useState<string>();

    const setCountryPercentage = async (
        country: CountryName,
        percentage: number
    ) => {
        await selectedCountriesRepository.setSelectedCountryPercentage(
            country,
            percentage
        );
        const newMap =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newMap);
    };

    const calculateAverageSpecificEmissions = () => {
        const newAverageSpecificEmissions =
            calculateAverageSpecificEmissionsHelper(selectedCountries);
        setAverageSpecificEmissions(newAverageSpecificEmissions);
    };

    const sumPercentages = () => {
        const percentage = Array.from(selectedCountries.values()).reduce(
            (accumulator, country) => {
                return accumulator + country;
            },
            0
        );

        if (percentage > 1) {
            throw new Error(
                `Error: The sum of the percentages is greater than 100%. Current sum: ${
                    percentage * 100
                }%`
            );
        }

        return percentage;
    };

    const refreshAndGetSize = async (bypassCache: boolean) => {
        try {
            sumPercentages();
            calculateAverageSpecificEmissions();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        try {
            await chrome.storage.local.set({ ["totalBytesReceived"]: 0 });
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
            return;
        }
        setError(undefined);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const tabId = tabs[0].id;
                if (tabId) {
                    chrome.tabs.reload(
                        tabId,
                        {
                            bypassCache: bypassCache,
                        },
                        () => {
                            chrome.runtime.sendMessage({
                                command: "startStoringWebRequestPayloadSize",
                                tabId,
                            });
                        }
                    );
                }
            }
        });
    };

    const addSelectedCountry = async (country: CountryName) => {
        await selectedCountriesRepository.addSelectedCountry(country);
        const newMap =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newMap);
    };

    const removeSelectedCountry = async (country: CountryName) => {
        await selectedCountriesRepository.removeSelectedCountry(country);
        const newMap =
            await selectedCountriesRepository.getSelectedCountriesAndPercentages();
        setSelectedCountries(newMap);
    };

    useEffect(() => {
        const totalBytesReceivedListener = (changes: {
            [key: string]: chrome.storage.StorageChange;
        }) => {
            if (changes.totalBytesReceived) {
                setTotalBytesReceived(changes.totalBytesReceived.newValue);
                const _emissions = calculateCarbon(
                    changes.totalBytesReceived.newValue,
                    selectedCountries
                );
                setEmissions(_emissions);
                emissionsRepository.storeLastCalculation({
                    bytes: changes.totalBytesReceived.newValue,
                    emissions: _emissions,
                    specificEmissions: averageSpecificEmissions,
                });
            }
        };

        chrome.storage.local.onChanged.addListener(totalBytesReceivedListener);

        return () => {
            chrome.storage.local.onChanged.removeListener(
                totalBytesReceivedListener
            );
        };
    }, [selectedCountries, averageSpecificEmissions, emissionsRepository]);

    useMountEffect(() => {
        selectedCountriesRepository
            .getSelectedCountriesAndPercentages()
            .then((newMap) => {
                setSelectedCountries(newMap);
            });
    });
    useMountEffect(() => {
        emissionsRepository.getLastCalculation().then((emissionsData) => {
            setTotalBytesReceived(emissionsData.bytes);
            setEmissions(emissionsData.emissions);
            setAverageSpecificEmissions(emissionsData.specificEmissions);
        });
    });

    return {
        emissions,
        totalBytesReceived,
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        error,
    };
};
