import { IStorageRepository } from "./IStorageRepository";

export class TestStorageRepository implements IStorageRepository {
    private _storageObject: { [key: string]: any } = {};

    async get(data: string | string[] | null): Promise<any> {
        if (data instanceof String) {
            return this._storageObject[data as string];
        } else if (data instanceof Array) {
            return data.map((key) => this._storageObject[key]);
        } else if (data === null) {
            return this._storageObject;
        } else {
            throw new Error("Invalid data type");
        }
    }

    // Set keys in storage object to values in data
    async set(data: { [key: string]: any }): Promise<void> {
        for (const key in data) {
            this._storageObject[key] = data[key];
        }
    }

    async clear(): Promise<void> {
        this._storageObject = {};
    }
}
