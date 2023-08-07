import {
    JSONtoCalculationDataArray,
    calculationDataArrayToJSON,
} from "../../utils/helpers/jsonHelpers";
import { IStorageRepository } from "../storage/IStorageRepository";
import { StorageKeys } from "../storage/StorageKeys";
import { CalculationData } from "./CalculationData";

export const CalculationsRepository = {
    getAllCalculations: async function (): Promise<CalculationData[]> {
        const data = await IStorageRepository.instance.get<string>(
            StorageKeys.allCalculations,
            JSON.stringify([])
        );
        return JSONtoCalculationDataArray(data);
    },

    storeCalculation: async function (
        calculationData: CalculationData
    ): Promise<void> {
        const oldCalculations = await this.getAllCalculations();
        const newCalculations = [calculationData, ...oldCalculations];
        await IStorageRepository.instance.set(
            StorageKeys.allCalculations,
            calculationDataArrayToJSON(newCalculations)
        );
    },

    getLastCalculation: async function (): Promise<CalculationData | null> {
        const calculations = await this.getAllCalculations();
        if (calculations.length > 0) {
            return calculations[0];
        }
        return null;
    },
};
