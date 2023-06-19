import { renderHook, act } from '@testing-library/react';
import { usePopup } from 'components/usePopup';
import { Countries, CountryName, WorldAverage } from '../constants/Countries';
import { compareMaps } from '../helpers/compareMaps';
import { mock } from 'node:test';



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
};

(global as any).chrome = mockChrome;

describe('usePopup', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('addSelectedCountry should update selectedCountries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";

        const mockCountries: Map<CountryName, number> = new Map();

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

    test('removeSelectedCountries should update selectedCountries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";


        const mockCountries: Map<CountryName, number> = new Map();


        mockCountries.set(mockCountry1, 0);
        mockCountries.set(mockCountry2, 0);

        act(() => {
            result.current.addSelectedCountry(mockCountry1);
        });

        act(() => {
            result.current.addSelectedCountry(mockCountry2);
        });

        expect(compareMaps(result.current.selectedCountries, mockCountries)).toBe(true)

        mockCountries.delete(mockCountry2);

        act(() => {
            result.current.removeSelectedCountry(mockCountry2);
        });

        expect(compareMaps(result.current.selectedCountries, mockCountries)).toBe(true)

    });

    test('averageSpecificEmissions should return the world average if there are no selected countries', () => {
        const { result } = renderHook(() => usePopup());

        act(() => {
            result.current.refreshAndGetSize()
        });

        expect(result.current.averageSpecificEmissions).toBe(WorldAverage);
    });

    test('averageSpecificEmissions should return the weighted average of the selected countries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry1Percentage = 0.5;
        const mockCountry2Percentage = 0.5;
        const mockAverageSpecificEmissions = mockCountry1Percentage * Countries[mockCountry1] + mockCountry2Percentage * Countries[mockCountry2];

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

    test('If there are locations, and the sum of percentages < 100, use remaining percentage on world average specific emissions', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry1Percentage = 0.4;
        const mockCountry2Percentage = 0.4;
        const mockAverageSpecificEmissions = mockCountry1Percentage * Countries[mockCountry1] + mockCountry2Percentage * Countries[mockCountry2] + (1 - mockCountry1Percentage - mockCountry2Percentage) * WorldAverage;

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

    test('If there are locations with missing percentages, divide remaining percentage equally between them and calculate the correct average specific emissions', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry3 = "Finland";
        const mockCountry1Percentage = 0.4;
        const dividedRemainingPercentage = (1 - mockCountry1Percentage) / 2;
        const mockAverageSpecificEmissions = mockCountry1Percentage * Countries[mockCountry1] + dividedRemainingPercentage * Countries[mockCountry2] + dividedRemainingPercentage * Countries[mockCountry3];

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
});

