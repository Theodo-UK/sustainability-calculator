import { IStorageRepository } from "../storage/IStorageRepository";
import { StorageKeys } from "../storage/StorageKeys";

export const RecordingRepository = {
    isOngoingCalculation: async (): Promise<boolean> => {
        const data = await IStorageRepository.instance.get<boolean>(
            StorageKeys.ongoingCalculation,
            false
        );
        return data;
    },

    setOngoingCalculation: async (ongoing: boolean): Promise<void> => {
        await IStorageRepository.instance.set(
            StorageKeys.ongoingCalculation,
            ongoing
        );
    },

    setStartUnixTime: async (unixTimeMs: number | null): Promise<void> => {
        await IStorageRepository.instance.set(
            StorageKeys.ongoingCalculationStartUnixTimeMs,
            unixTimeMs
        );
    },
    clearStartUnixTime: async (): Promise<void> => {
        await IStorageRepository.instance.set(
            StorageKeys.ongoingCalculationStartUnixTimeMs,
            -1
        );
    },
    getStartUnixTime: async (): Promise<number> => {
        const data = await IStorageRepository.instance.get<number>(
            StorageKeys.ongoingCalculationStartUnixTimeMs,
            -1
        );
        if (data === -1) {
            throw Error(
                "Tried to get start time when it was -1. Start time is -1 when there is no ongoing calculation."
            );
        }

        return data;
    },
};
