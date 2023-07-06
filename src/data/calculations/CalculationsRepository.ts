import { IStorageRepository } from "../storage/IStorageRepository";
import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class CalculationsRepository implements ICalculationsRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async storeLastCalculation(emissionsData: CalculationData): Promise<void> {
        try {
            await this.remoteDataSource.set({
                lastCalculation: JSON.stringify(emissionsData),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async getLastCalculation(): Promise<CalculationData> {
        try {
            const data = await this.remoteDataSource.get({
                lastCalculation: JSON.stringify(<CalculationData>{
                    bytes: 0,
                    emissions: 0,
                    specificEmissions: 0,
                }),
            });

            return JSON.parse(
                data["lastCalculation"] as string
            ) as CalculationData;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
