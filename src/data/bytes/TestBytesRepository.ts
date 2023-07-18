import { BytesLocalDataSource } from "./BytesLocalDataSource";
import { IBytesRepository } from "./IBytesRepository";

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
    }

    clearBytesTransferred(): void {
        this.localDataSource.clearBytesTransferred();
    }
}
