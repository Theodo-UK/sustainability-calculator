import { act, renderHook } from "@testing-library/react";
import {
    CalculationData,
    ICalculationsRepository,
} from "../../../../data/calculations/ICalculationsRepository";
import { useHistory } from "../useHistory";

describe("useHistory", () => {
    it("refreshCalculationHistory should return the correct calculation history", async () => {
        const { result } = renderHook(() => useHistory());

        const mockCalculationRepository = ICalculationsRepository.instance;
        mockCalculationRepository.storeCalculation(
            new CalculationData(
                12345,
                12345,
                12345,
                new Map([]),
                12345,
                "new user"
            )
        );
        mockCalculationRepository.storeCalculation(
            new CalculationData(
                54321,
                54321,
                54321,
                new Map([]),
                54321,
                "new user"
            )
        );

        await act(async () => {
            await result.current.refreshCalculationHistory();
        });

        expect(result.current.calculationHistory).toStrictEqual([
            new CalculationData(
                54321,
                54321,
                54321,
                new Map([]),
                54321,
                "new user"
            ),
            new CalculationData(
                12345,
                12345,
                12345,
                new Map([]),
                12345,
                "new user"
            ),
        ]);
    });
});
