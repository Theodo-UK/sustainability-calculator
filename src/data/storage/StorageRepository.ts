import {
    IStorageRepository,
    StorageDataType,
    parseStorageDataType,
} from "./IStorageRepository";
import { StorageRemoteDataSource } from "./StorageRemoteDataSource";

export class StorageRepository implements IStorageRepository {
    remoteDataSource: StorageRemoteDataSource = new StorageRemoteDataSource();

    async get<T extends StorageDataType>(
        key: string,
        defaultValue: T
    ): Promise<T> {
        const data = await this.remoteDataSource.get(key, defaultValue);
        if (typeof data !== typeof defaultValue) {
            throw new Error(
                `Expected ${key} to be of type ${typeof defaultValue} but got ${typeof data}`
            );
        }
        return parseStorageDataType<T>(data);
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
