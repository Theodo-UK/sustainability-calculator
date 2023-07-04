import { IStorageRepository } from "../storage/IStorageRepository";
import { EmissionsData, IEmissionsRepository } from "./IEmissionsRepository";

export class EmissionsRepository implements IEmissionsRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async storeLastCalculation(emissionsData: EmissionsData): Promise<void> {
        try {
            await this.remoteDataSource.set({
                lastCalculation: JSON.stringify(emissionsData),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async getLastCalculation(): Promise<EmissionsData> {
        try {
            const data = await this.remoteDataSource.get({
                lastCalculation: JSON.stringify(<EmissionsData>{
                    bytes: 0,
                    emissions: 0,
                    specificEmissions: 0,
                }),
            });

            return JSON.parse(data["lastCalculation"]) as EmissionsData;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
