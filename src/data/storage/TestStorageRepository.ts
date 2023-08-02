import {
    IStorageRepository,
    StorageDataType,
    parseStorageDataType,
} from "./IStorageRepository";

export class TestStorageRepository implements IStorageRepository {
    private _storageObject: { [key: string]: StorageDataType } = {};

    async get<T extends StorageDataType>(
        key: string,
        defaultValue: T
    ): Promise<T> {
        const data = this._storageObject[key];
        if (data === undefined) {
            this._storageObject[key] = defaultValue;
            return defaultValue;
        }
        return parseStorageDataType<T>(data);
    }

    async set(data: { [key: string]: StorageDataType }): Promise<void> {
        for (const key in data) {
            this._storageObject[key] = data[key];
        }
    }

    async clear(): Promise<void> {
        this._storageObject = {};
    }
}
