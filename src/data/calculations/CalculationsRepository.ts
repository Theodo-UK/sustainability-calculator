import {
    JSONtoCalculationDataArray,
    calculationDataArrayToJSON,
} from "../../utils/helpers/jsonHelpers";
import { IStorageRepository } from "../storage/IStorageRepository";
import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class CalculationsRepository implements ICalculationsRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async storeCalculation(calculationData: CalculationData): Promise<void> {
        const oldCalculations = await this.getAllCalculations();
        const newCalculations = [calculationData, ...oldCalculations];
        await this.remoteDataSource.set({
            allCalculations: calculationDataArrayToJSON(newCalculations),
        });
    }

    async getAllCalculations(): Promise<CalculationData[]> {
        const data = await this.remoteDataSource.get<string>(
            "allCalculations",
            JSON.stringify([])
        );
        return JSONtoCalculationDataArray(data);
    }

    async getLastCalculation(): Promise<CalculationData | null> {
        const oldCalculations = await this.getAllCalculations();
        if (oldCalculations.length > 0) {
            return oldCalculations[0];
        }
        return null;
    }
}
