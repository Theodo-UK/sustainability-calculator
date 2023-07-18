import { IStorageRepository, StorageDataType } from "./IStorageRepository";
import { StorageRemoteDataSource } from "./StorageRemoteDataSource";

export class StorageRepository implements IStorageRepository {
    remoteDataSource: StorageRemoteDataSource = new StorageRemoteDataSource();

    async get(
        data: string | string[] | { [key: string]: StorageDataType } | null
    ): Promise<{ [key: string]: StorageDataType }> {
        return await this.remoteDataSource.get(data);
    }

    async set(data: { [key: string]: StorageDataType }): Promise<void> {
        return this.remoteDataSource.set(data);
    }
    async getAndSet(
        key: string,
        mutateValue: (value: any) => any
    ): Promise<void> {
        return this.remoteDataSource.getAndSet(key, mutateValue);
    }

    async clear(): Promise<void> {
        return this.remoteDataSource.clear();
    }
}
