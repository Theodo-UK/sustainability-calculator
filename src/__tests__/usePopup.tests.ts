import { renderHook, act } from '@testing-library/react';

import { COUNTRIES, CountryName } from '../constants/Countries';
import { areMapsDeepEqual } from '../helpers/areMapsDeepEqual';
import { mock } from 'node:test';
import { usePopup } from '../components/usePopup';



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

describe('usePopup', () => {
    const mockCountries: Map<CountryName, number> = new Map([
        ["World Average", 0],
    ]);

    beforeEach(() => {
        jest.clearAllMocks();

    });

    it('addSelectedCountry should update selectedCountries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";


        mockCountries.set(mockCountry1, 0);
        act(() => {
            result.current.addSelectedCountry(mockCountry1);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);

        mockCountries.set(mockCountry2, 0);
        act(() => {
            result.current.addSelectedCountry(mockCountry2);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);
    });

    it('removeSelectedCountries should update selectedCountries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";


        mockCountries.set(mockCountry1, 0);
        mockCountries.set(mockCountry2, 0);

        act(() => {
            result.current.addSelectedCountry(mockCountry1);
        });

        act(() => {
            result.current.addSelectedCountry(mockCountry2);
        });

        expect(areMapsDeepEqual(result.current.selectedCountries, mockCountries)).toBe(true)

        mockCountries.delete(mockCountry2);

        act(() => {
            result.current.removeSelectedCountry(mockCountry2);
        });

        expect(areMapsDeepEqual(result.current.selectedCountries, mockCountries)).toBe(true)

    });

    it('averageSpecificEmissions should return the world average if there are no selected countries', () => {
        const { result } = renderHook(() => usePopup());

        act(() => {
            result.current.refreshAndGetSize()
        });

        expect(result.current.averageSpecificEmissions).toBe(COUNTRIES["World Average"]);
    });

    it('averageSpecificEmissions should return the weighted average of the selected countries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry1Percentage = 0.5;
        const mockCountry2Percentage = 0.5;
        const mockAverageSpecificEmissions = mockCountry1Percentage * COUNTRIES[mockCountry1] + mockCountry2Percentage * COUNTRIES[mockCountry2];

        act(() => {
            result.current.addSelectedCountry(mockCountry1);
        });

        act(() => {
            result.current.addSelectedCountry(mockCountry2);
        });

        act(() => {
            result.current.setCountryPercentage(mockCountry1, mockCountry1Percentage);
        });

        act(() => {
            result.current.setCountryPercentage(mockCountry2, mockCountry2Percentage);
        });

        act(() => {
            result.current.refreshAndGetSize()
        });

        expect(result.current.averageSpecificEmissions).toEqual(mockAverageSpecificEmissions);
    });

    it('If there are locations, and the sum of percentages < 100, use remaining percentage on world average specific emissions', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry1Percentage = 0.4;
        const mockCountry2Percentage = 0.4;
        const mockAverageSpecificEmissions = mockCountry1Percentage * COUNTRIES[mockCountry1] + mockCountry2Percentage * COUNTRIES[mockCountry2] + (1 - mockCountry1Percentage - mockCountry2Percentage) * COUNTRIES["World Average"];

        act(() => {
            result.current.addSelectedCountry(mockCountry1);
        });

        act(() => {
            result.current.addSelectedCountry(mockCountry2);
        });

        act(() => {
            result.current.setCountryPercentage(mockCountry1, mockCountry1Percentage);
        });

        act(() => {
            result.current.setCountryPercentage(mockCountry2, mockCountry2Percentage);
        });

        act(() => {
            result.current.refreshAndGetSize()
        });

        expect(result.current.averageSpecificEmissions).toEqual(mockAverageSpecificEmissions);
    });

    it('If there are locations with missing percentages, divide remaining percentage equally between them and calculate the correct average specific emissions', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry3 = "Finland";
        const mockCountry1Percentage = 0.4;
        const dividedRemainingPercentage = (1 - mockCountry1Percentage) / 3;
        const mockAverageSpecificEmissions = mockCountry1Percentage * COUNTRIES[mockCountry1] + dividedRemainingPercentage * COUNTRIES[mockCountry2] + dividedRemainingPercentage * COUNTRIES[mockCountry3] + dividedRemainingPercentage * COUNTRIES["World Average"];

        act(() => {
            result.current.addSelectedCountry(mockCountry1);
        });

        act(() => {
            result.current.addSelectedCountry(mockCountry2);
        });

        act(() => {
            result.current.addSelectedCountry(mockCountry3);
        });

        act(() => {
            result.current.setCountryPercentage(mockCountry1, mockCountry1Percentage);
        });

        act(() => {
            result.current.refreshAndGetSize()
        });

        expect(result.current.averageSpecificEmissions).toEqual(mockAverageSpecificEmissions);

    });

    it('If the sum of percentages > 100, then an error should be shown', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry1Percentage = 101;

        act(() => {
            result.current.addSelectedCountry(mockCountry1);
        });

        act(() => {
            result.current.setCountryPercentage(mockCountry1, mockCountry1Percentage);
        });

        act(() => {
            result.current.refreshAndGetSize()
        });

        expect(result.current.error).toBeDefined();
    });
});

