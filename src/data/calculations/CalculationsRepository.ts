import { IStorageRepository } from "../storage/IStorageRepository";
import {
    CalculationDataType,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class CalculationsRepository implements ICalculationsRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async isOngoingCalculation(): Promise<boolean> {
        const data = await this.remoteDataSource.get({
            ongoingCalculation: false,
        });
        return data["ongoingCalculation"] as boolean;
    }

    async setOngoingCalculation(ongoing: boolean): Promise<void> {
        await this.remoteDataSource.set({
            ongoingCalculation: ongoing,
        });
    }
    async storeCalculation(
        calculationData: CalculationDataType
    ): Promise<void> {
        const oldCalculations = await this.getAllCalculations();
        const newCalculations = [calculationData, ...oldCalculations];
        await this.remoteDataSource.set({
            allCalculations: JSON.stringify(newCalculations),
        });
    }

    async getAllCalculations(): Promise<CalculationDataType[]> {
        const data = await this.remoteDataSource.get({
            allCalculations: JSON.stringify([]),
        });

        return JSON.parse(
            data["allCalculations"] as string
        ) as CalculationDataType[];
    }

    async _getOngoingCalculation(): Promise<CalculationDataType | null> {
        const data = await this.remoteDataSource.get({
            ongoingCalculation: null,
        });

        if (data["ongoingCalculation"] !== null) {
            return JSON.parse(
                data["ongoingCalculation"] as string
            ) as CalculationDataType;
        }
        return null;
    }

    async getLastCalculation(): Promise<CalculationDataType | null> {
        const oldCalculations = await this.getAllCalculations();
        if (oldCalculations.length > 0) {
            return oldCalculations[0];
        }
        return null;
    }
}
