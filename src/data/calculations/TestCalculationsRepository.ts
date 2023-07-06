import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class TestCalculationsRepository implements ICalculationsRepository {
    private _lastCalculation: CalculationData = {
        bytes: 0,
        emissions: 0,
        specificEmissions: 0,
    };

    async storeLastCalculation(emissionsData: CalculationData): Promise<void> {
        this._lastCalculation = emissionsData;
    }

    async getLastCalculation(): Promise<CalculationData> {
        return this._lastCalculation;
    }
}
