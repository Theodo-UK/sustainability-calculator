import {
    CalculationDataType,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class TestCalculationsRepository implements ICalculationsRepository {
    private _allCalculations: CalculationDataType[] = [];
    private _ongoingCalculation = false;

    async storeCalculation(
        calculationData: CalculationDataType
    ): Promise<void> {
        const tempArray = [calculationData, ...this._allCalculations];
        this._allCalculations = tempArray;
    }

    async isOngoingCalculation(): Promise<boolean> {
        return this._ongoingCalculation;
    }

    async setOngoingCalculation(ongoing: boolean): Promise<void> {
        this._ongoingCalculation = ongoing;
    }

    async getAllCalculations(): Promise<CalculationDataType[]> {
        return this._allCalculations;
    }

    async getLastCalculation(): Promise<CalculationDataType | null> {
        if (this._allCalculations.length > 0) {
            return this._allCalculations[0];
        }
        return null;
    }
}
