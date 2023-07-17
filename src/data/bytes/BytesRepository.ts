import { IStorageRepository } from "../storage/IStorageRepository";
import { BytesLocalDataSource } from "./BytesLocalDataSource";
import { IBytesRepository } from "./IBytesRepository";
import { Listener } from "./Listener";

export class BytesRepository implements IBytesRepository {
    private localDataSource: BytesLocalDataSource = new BytesLocalDataSource();
    private remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async saveBytesTransferred(): Promise<void> {
        this.remoteDataSource.set({
            bytesTransferred: this.localDataSource.getBytesTransferred(),
        });
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
    listeners: Listener[] = [];

    addListener(listener: Listener): void {
        this.listeners = [...this.listeners, listener];
    }

    removeListener(listener: Listener): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            const temp = [...this.listeners];
            temp.splice(index, 1);
            this.listeners = temp;
        }
    }

    notifyListeners(): void {
        this.listeners.forEach((listener: Listener) => {
            listener.update();
        });
    }
}
