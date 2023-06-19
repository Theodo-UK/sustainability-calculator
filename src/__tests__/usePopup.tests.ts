import { renderHook, act } from '@testing-library/react';
import { usePopup } from 'components/usePopup';
import { CountryName, WorldAverage } from '../constants/Countries';
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


});

