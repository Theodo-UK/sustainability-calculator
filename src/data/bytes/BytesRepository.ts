import { IStorageRepository } from "../storage/IStorageRepository";
import { IBytesRepository } from "./IBytesRepository";

export class BytesRepository implements IBytesRepository {
    private remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getTotalBytesTransferred(): Promise<number> {
        const object = await this.remoteDataSource.get({
            totalBytesTransferred: 0,
        });
        return object.totalBytesTransferred;
    }

    async addBytesTransferred(bytes: number): Promise<void> {
        const currentBytes = await this.getTotalBytesTransferred();
        await this.remoteDataSource.set({
            totalBytesTransferred: currentBytes + bytes,
        });
    }

    async clearTotalBytesTransferred(): Promise<void> {
        await this.remoteDataSource.set({
            totalBytesTransferred: 0,
        });
    }
}
