import { CountryName } from "../constants/CountryEmissions";
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

    abstract storeCalculation(calculationData: CalculationData): Promise<void>;

    abstract cacheOngoingCalculation(
        calculationData: CalculationData
    ): Promise<void>;

    abstract clearOngoingCalculation(): Promise<void>;

    abstract getLastCalculation(): Promise<CalculationData | null>;

    abstract getAllCalculations(): Promise<CalculationData[]>;
}

export type CalculationData = {
    bytes: number;
    emissions: number;
    specificEmissions: number;
    selectedCountries: Map<CountryName, number>;
};
