import { renderHook, act } from '@testing-library/react';
import { usePopup } from 'components/usePopup';
import { CountryName } from '../constants/Countries';

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

    
    test('setSelectedCountries should update selectedCountry', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountries: Set<CountryName> = new Set();
        mockCountries.add("Australia");
        mockCountries.add("United Kingdom");

        act(() => {
            result.current.setSelectedCountries(mockCountries);
        });

        expect(result.current.selectedCountries).toBe(mockCountries);
    });

});