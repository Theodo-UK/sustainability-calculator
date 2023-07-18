import { IStorageRepository } from "../storage/IStorageRepository";
import { BytesLocalDataSource } from "./BytesLocalDataSource";
import { IBytesRepository } from "./IBytesRepository";

export class BytesRepository implements IBytesRepository {
    private localDataSource: BytesLocalDataSource = new BytesLocalDataSource();
    private remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async saveBytesTransferred(): Promise<void> {
        this.remoteDataSource.set({
            bytesTransferred: this.localDataSource.getBytesTransferred(),
        });
    }
    getBytesTransferred(): number {
        return this.localDataSource.getBytesTransferred();
    }

    addBytesTransferred(bytes: number): void {
        this.localDataSource.addBytesTransferred(bytes);
    }

    clearBytesTransferred(): void {
        this.localDataSource.clearBytesTransferred();
    }
}
