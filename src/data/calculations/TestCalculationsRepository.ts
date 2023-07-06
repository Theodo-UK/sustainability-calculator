import { CountryName } from "../../constants/Countries";
import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class TestCalculationsRepository implements ICalculationsRepository {
    private _lastCalculation: CalculationData = {
        bytes: 0,
        emissions: 0,
        specificEmissions: 0,
        selectedCountries: new Map<CountryName, number>(),
    };

    async storeLastCalculation(emissionsData: CalculationData): Promise<void> {
        this._lastCalculation = emissionsData;
    }

    async getLastCalculation(): Promise<CalculationData> {
        return this._lastCalculation;
    }
}
