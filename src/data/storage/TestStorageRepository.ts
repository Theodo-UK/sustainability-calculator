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

    async set(key: string, value: StorageDataType): Promise<void> {
        this._storageObject[key] = value;
    }

    async clear(): Promise<void> {
        this._storageObject = {};
    }
}
