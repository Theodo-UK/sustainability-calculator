import { IStorageRepository } from "../storage/IStorageRepository";
import {
    CalculationData,
    ICalculationsRepository,
} from "./ICalculationsRepository";

export class CalculationsRepository implements ICalculationsRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async storeCalculation(calculationData: CalculationData): Promise<void> {
        try {
            const oldCalculations = await this.getAllCalculations();
            const newCalculations = [calculationData, ...oldCalculations];
            await this.remoteDataSource.set({
                allCalculations: JSON.stringify(newCalculations),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async cacheOngoingCalculation(
        calculationData: CalculationData
    ): Promise<void> {
        try {
            await this.remoteDataSource.set({
                ongoingCalculation: JSON.stringify(calculationData),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async clearOngoingCalculation(): Promise<void> {
        try {
            await this.remoteDataSource.set({
                ongoingCalculation: null,
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async getAllCalculations(): Promise<CalculationData[]> {
        try {
            const data = await this.remoteDataSource.get({
                allCalculations: JSON.stringify([]),
            });

            return JSON.parse(
                data["allCalculations"] as string
            ) as CalculationData[];
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async _getOngoingCalculation(): Promise<CalculationData | null> {
        try {
            const data = await this.remoteDataSource.get({
                ongoingCalculation: null,
            });

            if (data["ongoingCalculation"] !== null) {
                return JSON.parse(
                    data["ongoingCalculation"] as string
                ) as CalculationData;
            }
            return null;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async getLastCalculation(): Promise<CalculationData | null> {
        try {
            const ongoingCalculation = await this._getOngoingCalculation();
            if (ongoingCalculation !== null) {
                return ongoingCalculation;
            }
            const oldCalculations = await this.getAllCalculations();
            if (oldCalculations.length > 0) {
                return oldCalculations[0];
            }
            return null;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
