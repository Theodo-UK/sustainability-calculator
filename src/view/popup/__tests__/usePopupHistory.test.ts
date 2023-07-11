import { renderHook, act } from "@testing-library/react";

import { usePopup } from "../usePopup";
import { ICalculationsRepository } from "../../../data/calculations/ICalculationsRepository";
import { mockChrome } from "./mockChrome";

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
            selectedCountries: new Map([["World Average", 0]]),
        });
        mockCalculationRepository.storeCalculation({
            bytes: 54321,
            emissions: 54321,
            specificEmissions: 54321,
            selectedCountries: new Map([["World Average", 0]]),
        });

        await act(async () => {
            await result.current.refreshCalculationHistory();
        });

        expect(result.current.calculationHistory).toStrictEqual([
            {
                bytes: 54321,
                emissions: 54321,
                specificEmissions: 54321,
                selectedCountries: new Map([["World Average", 0]]),
            },
            {
                bytes: 12345,
                emissions: 12345,
                specificEmissions: 12345,
                selectedCountries: new Map([["World Average", 0]]),
            },
        ]);
    });
});
