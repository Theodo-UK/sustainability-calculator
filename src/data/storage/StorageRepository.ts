import { IStorageRepository } from "./IStorageRepository";
import { StorageRemoteDataSource } from "./StorageRemoteDataSource";

export class StorageRepository implements IStorageRepository {
    remoteDataSource: StorageRemoteDataSource = new StorageRemoteDataSource();

    async get(
        data: string | string[] | { [key: string]: any } | null
    ): Promise<{ [key: string]: any }> {
        return await this.remoteDataSource.get(data);
    }

    async set(data: { [key: string]: any }): Promise<void> {
        return this.remoteDataSource.set(data);
    }

    async clear(): Promise<void> {
        return this.remoteDataSource.clear();
    }
}
