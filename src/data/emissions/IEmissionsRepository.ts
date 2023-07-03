import { EmissionsRepository } from "./EmissionsRepository";
import { TestEmissionsRepository } from "./TestEmissionsRepository";

export abstract class IEmissionsRepository {
    private static _instance: IEmissionsRepository;
    static get instance(): IEmissionsRepository {
        if (!this._instance) {
            switch (process.env.ENV) {
                case "development":
                    this._instance = new EmissionsRepository();
                    break;
                case "test":
                    this._instance = new TestEmissionsRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }

        return this._instance;
    }

    abstract storeLastCalculation(emissionsData: EmissionsData): Promise<void>;

    abstract getLastCalculation(): Promise<EmissionsData>;
}

export type EmissionsData = {
    bytes: number;
    emissions: number;
    specificEmissions: number;
};
