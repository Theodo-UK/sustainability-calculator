import { BytesLocalDataSource } from "./BytesLocalDataSource";
import { IBytesRepository } from "./IBytesRepository";
import { Listener } from "./Listener";

export class TestBytesRepository implements IBytesRepository {
    private localDataSource: BytesLocalDataSource = new BytesLocalDataSource();
    private _remoteBytesTransferred = 0;
    async saveBytesTransferred(): Promise<void> {
        this._remoteBytesTransferred =
            this.localDataSource.getBytesTransferred();
    }
    getBytesTransferred(): number {
        return this.localDataSource.getBytesTransferred();
    }

    addBytesTransferred(bytes: number): void {
        this.localDataSource.addBytesTransferred(bytes);
        this.notifyListeners();
    }

    clearBytesTransferred(): void {
        this.localDataSource.clearBytesTransferred();
    }

    private listeners: Listener[] = [];

    addListener(listener: Listener): void {
        this.listeners.push(listener);
    }

    removeListener(listener: Listener): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) this.listeners.splice(index, 1);
    }

    notifyListeners(): void {
        this.listeners.forEach((listener: Listener) => {
            listener.update();
        });
    }
}
