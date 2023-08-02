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

    static async getStartUnixTime(): Promise<number> {
        const data = await IStorageRepository.instance.get<number | null>(
            "ongoingCalculationStartUnixTimeMs",
            null
        );
        if (data === null) {
            throw Error(
                "Tried to get start time when it was null. Start time is null when there is no ongoing calculation."
            );
        }

        return data;
    }
}
