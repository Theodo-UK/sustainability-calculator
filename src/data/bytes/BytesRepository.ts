import { BytesRemoteDataSource } from "./BytesRemoteDataSource";
import { IBytesRepository } from "./IBytesRepository";

export class BytesRepository implements IBytesRepository {
    remoteDataSource: BytesRemoteDataSource = new BytesRemoteDataSource();

    async getTotalBytesTransferred(): Promise<number> {
        return this.remoteDataSource.getTotalBytesTransferred();
    }

    async addBytesTransferred(bytes: number): Promise<void> {
        return this.remoteDataSource.addBytesTransferred(bytes);
    }

    async clearTotalBytesTransferred(): Promise<void> {
        return this.remoteDataSource.clearTotalBytesTransferred();
    }
}
