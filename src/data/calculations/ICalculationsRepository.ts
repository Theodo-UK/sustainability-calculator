import { CountryName } from "../../constants/Countries";
import { CalculationsRepository } from "./CalculationsRepository";
import { TestCalculationsRepository } from "./TestCalculationsRepository";

export abstract class ICalculationsRepository {
    private static _instance: ICalculationsRepository;
    static get instance(): ICalculationsRepository {
        if (!this._instance) {
            switch (process.env.ENV) {
                case "development":
                    this._instance = new CalculationsRepository();
                    break;
                case "test":
                    this._instance = new TestCalculationsRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }

        return this._instance;
    }

    abstract storeLastCalculation(
        emissionsData: CalculationData
    ): Promise<void>;

    abstract getLastCalculation(): Promise<CalculationData>;
}

export type CalculationData = {
    bytes: number;
    emissions: number;
    specificEmissions: number;
    selectedCountries: Map<CountryName, number>;
};
