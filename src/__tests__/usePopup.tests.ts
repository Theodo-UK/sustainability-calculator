import { renderHook, act } from '@testing-library/react';
import { LocationType } from 'components/LocationDropdown';
import { LOCATIONS } from 'constants/locations';
import { usePopup } from 'usePopup';

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

    test('selectedLocation should be default i.e. first item in list', () => {
        const { result } = renderHook(() => usePopup());

        expect(result.current.selectedLocation).toBe(LOCATIONS[0]);
    });

    test('setSelectedLocation should update selectedLocation', () => {
        const { result } = renderHook(() => usePopup());

        const mockLocation: LocationType = { country: 'random country', value: 1 };

        act(() => {
            result.current.setSelectedLocation(mockLocation);
        });

        expect(result.current.selectedLocation).toBe(mockLocation);
    });

});