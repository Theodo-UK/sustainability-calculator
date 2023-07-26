import { JSONtoMap, maptoJSON } from "../../utils/helpers/jsonHelpers";
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

export class CalculationData {
    constructor(
        public bytes: number,
        public emissions: number,
        public specificEmissions: number,
        public selectedCountries: Map<CountryName, number>,
        public unixTimeMs: number,
        public userType: UserType
    ) {}

    public toJSON(): string {
        return JSON.stringify({
            bytes: this.bytes,
            emissions: this.emissions,
            specificEmissions: this.specificEmissions,
            selectedCountries: maptoJSON(this.selectedCountries),
            unixTimeMs: this.unixTimeMs,
            userType: this.userType,
        });
    }

    public static fromJSON(json: string): CalculationData {
        const obj = JSON.parse(json);
        const selectedCountries = JSONtoMap<CountryName, number>(
            obj.selectedCountries
        );
        return new CalculationData(
            obj.bytes,
            obj.emissions,
            obj.specificEmissions,
            selectedCountries,
            obj.unixTimeMs,
            obj.userType
        );
    }
}
