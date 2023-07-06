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
            allCalculations: JSON.stringify(newCalculations),
        });
    }

    async cacheOngoingCalculation(
        calculationData: CalculationData
    ): Promise<void> {
        await this.remoteDataSource.set({
            ongoingCalculation: JSON.stringify(calculationData),
        });
    }

    async clearOngoingCalculation(): Promise<void> {
        await this.remoteDataSource.set({
            ongoingCalculation: null,
        });
    }

    async getAllCalculations(): Promise<CalculationData[]> {
        const data = await this.remoteDataSource.get({
            allCalculations: JSON.stringify([]),
        });

        return JSON.parse(
            data["allCalculations"] as string
        ) as CalculationData[];
    }

    async _getOngoingCalculation(): Promise<CalculationData | null> {
        const data = await this.remoteDataSource.get({
            ongoingCalculation: null,
        });

        if (data["ongoingCalculation"] !== null) {
            return JSON.parse(
                data["ongoingCalculation"] as string
            ) as CalculationData;
        }
        return null;
    }

    async getLastCalculation(): Promise<CalculationData | null> {
        const ongoingCalculation = await this._getOngoingCalculation();
        if (ongoingCalculation !== null) {
            return ongoingCalculation;
        }
        const oldCalculations = await this.getAllCalculations();
        if (oldCalculations.length > 0) {
            return oldCalculations[0];
        }
        return null;
    }
}
