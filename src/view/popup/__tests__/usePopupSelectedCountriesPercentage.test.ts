import { renderHook, act } from "@testing-library/react";

import { COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB } from "../../../data/constants/CountryEmissions";
import { usePopup } from "../usePopup";
import { mockChrome } from "../../../utils/test-objects/mockChrome";

(global as any).chrome = mockChrome;

describe("usePopup", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("If there are locations, and the sum of percentages < 100, use remaining percentage on world average specific emissions", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry2 = "United Kingdom";
        const mockCountry1Percentage = 0.4;
        const mockCountry2Percentage = 0.4;
        const mockAverageSpecificEmissions =
            mockCountry1Percentage *
                COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB[mockCountry1] +
            mockCountry2Percentage *
                COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB[mockCountry2] +
            (1 - mockCountry1Percentage - mockCountry2Percentage) *
                COUNTRY_CO2_EMISSIONS_GRAMS_PER_GB["World Average"];

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
});
