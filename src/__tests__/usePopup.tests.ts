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

    
    test('setSelectedCountry should update selectedCountry', () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry: CountryName = 'United Kingdom';

        act(() => {
            result.current.setSelectedCountry(mockCountry);
        });

        expect(result.current.selectedCountry).toBe(mockCountry);
    });

});