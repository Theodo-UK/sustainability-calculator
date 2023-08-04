import {
    JSONtoCalculationDataArray,
    calculationDataArrayToJSON,
} from "../../utils/helpers/jsonHelpers";
import { IStorageRepository } from "../storage/IStorageRepository";
import { StorageKeys } from "../storage/StorageKeys";
import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class CalculationsRepository implements ICalculationsRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async storeCalculation(calculationData: CalculationData): Promise<void> {
        const oldCalculations = await this.getAllCalculations();
        const newCalculations = [calculationData, ...oldCalculations];
        await this.remoteDataSource.set(
            StorageKeys.allCalculations,
            calculationDataArrayToJSON(newCalculations)
        );
    }

    async getAllCalculations(): Promise<CalculationData[]> {
        const data = await this.remoteDataSource.get<string>(
            StorageKeys.allCalculations,
            JSON.stringify([])
        );
        return JSONtoCalculationDataArray(data);
    }

    async getLastCalculation(): Promise<CalculationData | null> {
        const calculations = await this.getAllCalculations();
        if (calculations.length > 0) {
            return calculations[0];
        }
        return null;
    }
}
