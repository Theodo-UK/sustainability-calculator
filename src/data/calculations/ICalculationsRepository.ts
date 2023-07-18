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

    abstract isOngoingCalculation(): Promise<boolean>;

    abstract setOngoingCalculation(ongoing: boolean): Promise<void>;

    abstract storeCalculation(
        calculationData: CalculationDataType
    ): Promise<void>;

    abstract getLastCalculation(): Promise<CalculationDataType | null>;

    abstract getAllCalculations(): Promise<CalculationDataType[]>;
}

export type UserType = "new user" | "returning user";

export type CalculationDataType = {
    bytes: number;
    emissions: number;
    specificEmissions: number;
    selectedCountries: Map<CountryName, number>;
    unixTimeMs: number;
    userType: UserType;
};
