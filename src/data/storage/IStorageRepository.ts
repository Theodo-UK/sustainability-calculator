import { StorageRepository } from "./StorageRepository";
import { TestStorageRepository } from "./TestStorageRepository";

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

    /**
     * @param keys A single key to get, list of keys to get, or a dictionary specifying default values.
     * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
     */
    abstract get(
        keys: string | string[] | { [key: string]: any } | null
    ): Promise<{ [key: string]: any }>;

    abstract set(data: { [key: string]: any }): Promise<void>;

    abstract clear(): Promise<void>;
}
