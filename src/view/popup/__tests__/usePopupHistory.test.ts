import { renderHook, act } from "@testing-library/react";

import { usePopup } from "../usePopup";
import { ICalculationsRepository } from "../../../data/calculations/ICalculationsRepository";
import { mockChrome } from "../../../utils/test-objects/mockChrome";

(global as any).chrome = mockChrome;

describe("usePopup", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("refreshCalculationHistory should show all calculations", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCalculationRepository = ICalculationsRepository.instance;
        mockCalculationRepository.storeCalculation({
            bytes: 12345,
            emissions: 12345,
            specificEmissions: 12345,
            selectedCountries: new Map([]),
            unixTimeMs: 12345,
            userType: "new user",
        });
        mockCalculationRepository.storeCalculation({
            bytes: 54321,
            emissions: 54321,
            specificEmissions: 54321,
            selectedCountries: new Map([]),
            unixTimeMs: 54321,
            userType: "new user",
        });

        await act(async () => {
            await result.current.refreshCalculationHistory();
        });

        expect(result.current.calculationHistory).toStrictEqual([
            {
                bytes: 54321,
                emissions: 54321,
                specificEmissions: 54321,
                selectedCountries: new Map([]),
                unixTimeMs: 54321,
                userType: "new user",
            },
            {
                bytes: 12345,
                emissions: 12345,
                specificEmissions: 12345,
                selectedCountries: new Map([]),
                unixTimeMs: 12345,
                userType: "new user",
            },
        ]);
    });
});
