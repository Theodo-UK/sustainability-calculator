import { BytesRepository } from "./BytesRepository";
import { TestBytesRepository } from "./TestBytesRepository";

export abstract class IBytesRepository {
    private static _instance: IBytesRepository;
    static get instance(): IBytesRepository {
        if (!this._instance) {
            switch (process.env.ENV) {
                case "development":
                    this._instance = new BytesRepository();
                    break;
                case "test":
                    this._instance = new TestBytesRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }

        return this._instance;
    }

    abstract getTotalBytesTransferred(): Promise<number>;

    abstract addBytesTransferred(bytes: number): Promise<void>;

    abstract clearTotalBytesTransferred(): Promise<void>;
}
