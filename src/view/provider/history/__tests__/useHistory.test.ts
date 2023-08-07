import { act, renderHook } from "@testing-library/react";
import { CalculationData } from "../../../../data/calculations/CalculationData";
import { CalculationsRepository } from "../../../../data/calculations/CalculationsRepository";
import { useHistory } from "../useHistory";

describe("useHistory", () => {
    it("refreshCalculationHistory should return the correct calculation history", async () => {
        const { result } = renderHook(() => useHistory());

        const mockCalculation1 = new CalculationData(
            12345,
            new Map([]),
            new Map([]),
            12345,
            12345,
            "new user"
        );

        const mockCalculation2 = new CalculationData(
            54321,
            new Map([]),
            new Map([]),
            54321,
            54321,
            "new user"
        );

        await CalculationsRepository.storeCalculation(mockCalculation1);
        await CalculationsRepository.storeCalculation(mockCalculation2);

        await act(async () => {
            await result.current.refreshCalculationHistory();
        });

        const hookJson = result.current.calculationHistory?.map((calc) =>
            calc.toJSON()
        );
        const mockJson = [mockCalculation2, mockCalculation1].map((calc) =>
            calc.toJSON()
        );
        expect(hookJson).toStrictEqual(mockJson);
    });
});
