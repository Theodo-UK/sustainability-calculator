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
}
