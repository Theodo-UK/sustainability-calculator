import { StorageRepository } from "./StorageRepository";
import { TestStorageRepository } from "./TestStorageRepository";

export type StorageDataType = string | number | boolean | null;

export abstract class IStorageRepository {
    private static _instance: IStorageRepository;
    static get instance(): IStorageRepository {
        if (!this._instance) {
            switch (process.env.ENV) {
                case "development":
                    this._instance = new StorageRepository();
                    break;
                case "test":
                    this._instance = new TestStorageRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }

        return this._instance;
    }

    abstract get<T extends StorageDataType>(
        key: string,
        defaultValue: T
    ): Promise<T>;

    abstract set(data: { [key: string]: StorageDataType }): Promise<void>;

    abstract getAndSet(
        key: string,
        mutateValue: (value: any) => any
    ): Promise<void>;

    abstract clear(): Promise<void>;
}

export const parseStorageDataType = <T extends StorageDataType>(
    data: StorageDataType
): T => {
    if (
        typeof data === "string" ||
        typeof data === "number" ||
        typeof data === "boolean" ||
        data === null
    ) {
        return data as T;
    }
    throw new Error(`${data} of type ${typeof data} is not a StorageDataType`);
};
