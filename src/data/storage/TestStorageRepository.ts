import { IStorageRepository, StorageDataType } from "./IStorageRepository";

export class TestStorageRepository implements IStorageRepository {
    private _storageObject: { [key: string]: StorageDataType } = {};

    async get(
        key: string,
        defaultValue: StorageDataType
    ): Promise<StorageDataType> {
        const data = this._storageObject[key];
        if (data === undefined) {
            this._storageObject[key] = defaultValue;
            return defaultValue;
        }
        return data;
    }

    async set(data: { [key: string]: StorageDataType }): Promise<void> {
        for (const key in data) {
            this._storageObject[key] = data[key];
        }
    }

    async getAndSet(
        key: string,
        mutateValue: (value: any) => any
    ): Promise<void> {
        throw Error("Not implemented");
    }

    async clear(): Promise<void> {
        this._storageObject = {};
    }
}
