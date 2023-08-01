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

    abstract get(
        key: string,
        defaultValue: StorageDataType
    ): Promise<StorageDataType>;

    abstract set(data: { [key: string]: StorageDataType }): Promise<void>;

    abstract getAndSet(
        key: string,
        mutateValue: (value: any) => any
    ): Promise<void>;

    abstract clear(): Promise<void>;
}
