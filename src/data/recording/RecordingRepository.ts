import { IStorageRepository } from "../storage/IStorageRepository";

export abstract class RecordingRepository {
    static async isOngoingCalculation(): Promise<boolean> {
        const data = await IStorageRepository.instance.get<boolean>(
            "ongoingCalculation",
            false
        );
        return data;
    }

    static async setOngoingCalculation(ongoing: boolean): Promise<void> {
        await IStorageRepository.instance.set({
            ongoingCalculation: ongoing,
        });
    }

    static async setStartUnixTime(unixTimeMs: number | null): Promise<void> {
        await IStorageRepository.instance.set({
            ongoingCalculationStartUnixTimeMs: unixTimeMs,
        });
    }

    static async clearStartUnixTime(): Promise<void> {
        await IStorageRepository.instance.set({
            ongoingCalculationStartUnixTimeMs: -1,
        });
    }

    static async getStartUnixTime(): Promise<number> {
        const data = await IStorageRepository.instance.get<number>(
            "ongoingCalculationStartUnixTimeMs",
            -1
        );
        if (data === -1) {
            throw Error(
                "Tried to get start time when it was -1. Start time is -1 when there is no ongoing calculation."
            );
        }

        return data;
    }
}
