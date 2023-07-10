import { renderHook, act } from "@testing-library/react";

import { CountryName } from "../data/constants/CountryEmissions";
import { areMapsDeepEqual } from "../helpers/areMapsDeepEqual";
import { usePopup } from "../usePopup";
import { mockChrome } from "./mockChrome";

(global as any).chrome = mockChrome;

describe("usePopup tests for selectedCountries", () => {
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
});
