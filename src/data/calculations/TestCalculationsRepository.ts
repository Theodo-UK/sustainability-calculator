import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class TestCalculationsRepository implements ICalculationsRepository {
    private _allCalculations: CalculationData[] = [];
    private _ongoingCalculation = false;

    async storeCalculation(calculationData: CalculationData): Promise<void> {
        const tempArray = [calculationData, ...this._allCalculations];
        this._allCalculations = tempArray;
    }

    async getAllCalculations(): Promise<CalculationData[]> {
        return this._allCalculations;
    }

    async getLastCalculation(): Promise<CalculationData | null> {
        if (this._allCalculations.length > 0) {
            return this._allCalculations[0];
        }
        return null;
    }
}
