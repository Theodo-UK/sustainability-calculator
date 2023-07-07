import { renderHook, act } from "@testing-library/react";

import {
    CO2_EMISSIONS_GRAMS_PER_GB,
    CountryName,
} from "../constants/Countries";
import { areMapsDeepEqual } from "../helpers/areMapsDeepEqual";
import { usePopup } from "../usePopup";
import { ICalculationsRepository } from "../data/calculations/ICalculationsRepository";

const mockChrome = {
    tabs: {
        query: jest.fn(),
        reload: jest.fn(),
    },
    runtime: {
        onMessage: {
            addListener: jest.fn(),
        },
        sendMessage: jest.fn(),
    },
    storage: {
        local: {
            get: jest.fn(),
            set: jest.fn(),
            onChanged: {
                addListener: jest.fn(),
                removeListener: jest.fn(),
            },
        },
    },
};

(global as any).chrome = mockChrome;

describe("usePopup", () => {
    const mockCountries: Map<CountryName, number> = new Map([
        ["World Average", 0],
    ]);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("addSelectedCountry should update selectedCountries", async () => {
        const { result } = renderHook(() => usePopup());
        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";

        mockCountries.set(mockCountry1, 0);
        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);

        mockCountries.set(mockCountry2, 0);
        await act(async () => {
            await result.current.addSelectedCountry(mockCountry2);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);
    });

    it("removeSelectedCountries should update selectedCountries", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";

        mockCountries.set(mockCountry1, 0);
        mockCountries.set(mockCountry2, 0);

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry2);
        });

        expect(
            areMapsDeepEqual(result.current.selectedCountries, mockCountries)
        ).toBe(true);

        mockCountries.delete(mockCountry2);

        await act(async () => {
            await result.current.removeSelectedCountry(mockCountry2);
        });

        expect(
            areMapsDeepEqual(result.current.selectedCountries, mockCountries)
        ).toBe(true);
    });

    it("averageSpecificEmissions should return the weighted average of the selected countries", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry1Percentage = 0.5;
        const mockCountry2Percentage = 0.5;
        const mockAverageSpecificEmissions =
            mockCountry1Percentage * CO2_EMISSIONS_GRAMS_PER_GB[mockCountry1] +
            mockCountry2Percentage * CO2_EMISSIONS_GRAMS_PER_GB[mockCountry2];

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry2);
        });

        await act(async () => {
            await result.current.setCountryPercentage(
                mockCountry1,
                mockCountry1Percentage
            );
        });

        await act(async () => {
            await result.current.setCountryPercentage(
                mockCountry2,
                mockCountry2Percentage
            );
        });

        await act(async () => {
            await result.current.refreshAndGetSize(false);
        });

        expect(result.current.averageSpecificEmissions).toEqual(
            mockAverageSpecificEmissions
        );
    });

    it("If there are locations, and the sum of percentages < 100, use remaining percentage on world average specific emissions", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry1Percentage = 0.4;
        const mockCountry2Percentage = 0.4;
        const mockAverageSpecificEmissions =
            mockCountry1Percentage * CO2_EMISSIONS_GRAMS_PER_GB[mockCountry1] +
            mockCountry2Percentage * CO2_EMISSIONS_GRAMS_PER_GB[mockCountry2] +
            (1 - mockCountry1Percentage - mockCountry2Percentage) *
                CO2_EMISSIONS_GRAMS_PER_GB["World Average"];

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry2);
        });

        await act(async () => {
            await result.current.setCountryPercentage(
                mockCountry1,
                mockCountry1Percentage
            );
        });

        await act(async () => {
            await result.current.setCountryPercentage(
                mockCountry2,
                mockCountry2Percentage
            );
        });

        await act(async () => {
            await result.current.refreshAndGetSize(false);
        });

        expect(result.current.averageSpecificEmissions).toEqual(
            mockAverageSpecificEmissions
        );
    });

    it("If the sum of percentages > 100, then an error should be shown", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry1Percentage = 101;

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });

        await act(async () => {
            await result.current.setCountryPercentage(
                mockCountry1,
                mockCountry1Percentage
            );
        });

        await act(async () => {
            await result.current.refreshAndGetSize(false);
        });

        expect(result.current.error).toBeDefined();
    });
    it("refreshCalculationHistory should show all calculations", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCalculationRepository = ICalculationsRepository.instance;
        mockCalculationRepository.storeCalculation({
            bytes: -1,
            emissions: -1,
            specificEmissions: -1,
            selectedCountries: new Map([["World Average", 0]]),
        });
        mockCalculationRepository.storeCalculation({
            bytes: -2,
            emissions: -2,
            specificEmissions: -2,
            selectedCountries: new Map([["World Average", 0]]),
        });

        await act(async () => {
            await result.current.refreshCalculationHistory();
        });

        expect(result.current.calculationHistory).toStrictEqual([
            {
                bytes: -2,
                emissions: -2,
                specificEmissions: -2,
                selectedCountries: new Map([["World Average", 0]]),
            },
            {
                bytes: -1,
                emissions: -1,
                specificEmissions: -1,
                selectedCountries: new Map([["World Average", 0]]),
            },
        ]);
    });
});
