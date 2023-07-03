import { EmissionsData, IEmissionsRepository } from "./IEmissionsRepository";

export class TestEmissionsRepository implements IEmissionsRepository {
    private _lastCalculation: EmissionsData = {
        bytes: 0,
        emissions: 0,
        specificEmissions: 0,
    };

    async storeLastCalculation(emissionsData: EmissionsData): Promise<void> {
        this._lastCalculation = emissionsData;
    }

    async getLastCalculation(): Promise<EmissionsData> {
        return this._lastCalculation;
    }
}
