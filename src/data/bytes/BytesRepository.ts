import { IStorageRepository } from "../storage/IStorageRepository";
import { IBytesRepository } from "./IBytesRepository";

export class BytesRepository implements IBytesRepository {
    private remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getTotalBytesTransferred(): Promise<number> {
        const object = await this.remoteDataSource.get({
            bytesTransferred: 0,
        });
        return object.bytesTransferred as number;
    }

    async addBytesTransferred(bytes: number): Promise<void> {
        const currentBytes = await this.getTotalBytesTransferred();
        await this.remoteDataSource.set({
            bytesTransferred: currentBytes + bytes,
        });
    }

    async clearTotalBytesTransferred(): Promise<void> {
        await this.remoteDataSource.set({
            bytesTransferred: 0,
        });
    }
}
