import { EmissionsRemoteDataSource } from "./EmissionsRemoteDataSource";
import { EmissionsData, IEmissionsRepository } from "./IEmissionsRepository";

export class EmissionsRepository implements IEmissionsRepository {
    remoteDataSource: EmissionsRemoteDataSource =
        new EmissionsRemoteDataSource();

    async storeLastCalculation(emissionsData: EmissionsData): Promise<void> {
        try {
            await this.remoteDataSource.storeLastCalculation(emissionsData);
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async getLastCalculation(): Promise<EmissionsData> {
        try {
            return await this.remoteDataSource.getLastCalculation();
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
