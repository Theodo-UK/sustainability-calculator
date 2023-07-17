import { BytesRepository } from "./BytesRepository";
import { Listener } from "./Listener";
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

    abstract saveBytesTransferred(): Promise<void>;

    abstract getBytesTransferred(): number;

    abstract addBytesTransferred(bytes: number): void;

    abstract clearBytesTransferred(): void;

    abstract addListener(listener: Listener): void;

    abstract removeListener(listener: Listener): void;

    abstract notifyListeners(): void;
}
