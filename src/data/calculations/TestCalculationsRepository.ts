import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class TestCalculationsRepository implements ICalculationsRepository {
    private _allCalculations: CalculationData[] = [];

    async storeLastCalculation(emissionsData: CalculationData): Promise<void> {
        const tempArray = [emissionsData, ...this._allCalculations];
        this._allCalculations = tempArray;
    }

    async getAllCalculations(): Promise<CalculationData[]> {
        return this._allCalculations;
    }

    async getLastCalculation(): Promise<CalculationData> {
        return this._allCalculations[0];
    }
}
