import { act, renderHook } from "@testing-library/react";

import { ICalculationsRepository } from "../../../data/calculations/ICalculationsRepository";
import { mockChrome } from "../../../utils/test-objects/mockChrome";
import { usePopup } from "../usePopup";

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
            flowTime: 12345,
            selectedCountries: new Map([]),
            selectedDevices: new Map([]),
            unixTimeMs: 12345,
            userType: "new user",
        });
        mockCalculationRepository.storeCalculation({
            bytes: 12345,
            flowTime: 12345,
            selectedCountries: new Map([]),
            selectedDevices: new Map([]),
            unixTimeMs: 54321,
            userType: "new user",
        });

        await act(async () => {
            await result.current.refreshCalculationHistory();
        });

        expect(result.current.calculationHistory).toStrictEqual([
            {
                bytes: 12345,
                flowTime: 12345,
                selectedCountries: new Map([]),
                selectedDevices: new Map([]),
                unixTimeMs: 54321,
                userType: "new user",
            },
            {
                bytes: 12345,
                flowTime: 12345,
                selectedCountries: new Map([]),
                selectedDevices: new Map([]),
                unixTimeMs: 12345,
                userType: "new user",
            },
        ]);
    });
});
