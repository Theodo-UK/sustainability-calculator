import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class TestCalculationsRepository implements ICalculationsRepository {
    private _allCalculations: CalculationData[] = [];
    private _ongoingCalculation: CalculationData | null = null;

    async storeCalculation(calculationData: CalculationData): Promise<void> {
        const tempArray = [calculationData, ...this._allCalculations];
        this._allCalculations = tempArray;
    }

    async cacheOngoingCalculation(
        calculationData: CalculationData
    ): Promise<void> {
        this._ongoingCalculation = calculationData;
    }

    async clearOngoingCalculation(): Promise<void> {
        this._ongoingCalculation = null;
    }

    async getAllCalculations(): Promise<CalculationData[]> {
        return this._allCalculations;
    }

    async getLastCalculation(): Promise<CalculationData | null> {
        if (this._ongoingCalculation !== null) {
            return this._ongoingCalculation;
        }
        if (this._allCalculations.length > 0) {
            return this._allCalculations[0];
        }
        return null;
    }
}
