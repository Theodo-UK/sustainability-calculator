import { renderHook, act } from '@testing-library/react';
import { usePopup } from 'components/usePopup';
import { CountryName } from '../constants/Countries';
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


    test('addToSelectedCountries should update selectedCountries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";

        const mockCountries: Set<CountryName> = new Set();

        mockCountries.add(mockCountry1);
        act(() => {
            result.current.addToSelectedCountries(mockCountry1);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);

        mockCountries.add(mockCountry2);
        act(() => {
            result.current.addToSelectedCountries(mockCountry2);
        });
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);
    });

    test('removeSelectedCountries should update selectedCountries', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";

        const mockCountries: Set<CountryName> = new Set();
       

        mockCountries.add(mockCountry1);
        mockCountries.add(mockCountry2);

        act(() => {
            result.current.addToSelectedCountries(mockCountry1);
        });
        
        act(() => {
            result.current.addToSelectedCountries(mockCountry2);
        });

        expect(result.current.selectedCountries).toStrictEqual(mockCountries);
        
        mockCountries.delete(mockCountry2);

        act(() => {
            result.current.removeSelectedCountry(mockCountry2);
        });
        
        expect(result.current.selectedCountries).toStrictEqual(mockCountries);
    });

});