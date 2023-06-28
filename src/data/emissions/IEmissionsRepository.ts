import { EmissionsRepository } from "./EmissionsRepository";

export abstract class IEmissionsRepository {
    private static _instance: IEmissionsRepository;
    static get instance(): IEmissionsRepository {
        this._instance = new EmissionsRepository();
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
