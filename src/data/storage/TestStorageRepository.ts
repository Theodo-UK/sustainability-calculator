import { IStorageRepository, StorageDataType } from "./IStorageRepository";

export class TestStorageRepository implements IStorageRepository {
    private _storageObject: { [key: string]: StorageDataType } = {};

    async get(
        data: string | string[] | null
    ): Promise<{ [key: string]: StorageDataType }> {
        if (data instanceof String) {
            return { key: this._storageObject[data as string] };
        } else if (data instanceof Array) {
            const result: { [key: string]: StorageDataType } = {};
            for (const key of data) {
                result[key] = this._storageObject[key];
            }
            return result;
        } else if (data === null) {
            return this._storageObject;
        } else {
            throw new Error("Invalid data type");
        }
    }

    // Set keys in storage object to values in data
    async set(data: { [key: string]: StorageDataType }): Promise<void> {
        for (const key in data) {
            this._storageObject[key] = data[key];
        }
    }

    async clear(): Promise<void> {
        this._storageObject = {};
    }
}
