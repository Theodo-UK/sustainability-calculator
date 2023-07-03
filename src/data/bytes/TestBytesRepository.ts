import { IBytesRepository } from "./IBytesRepository";

export class TestBytesRepository implements IBytesRepository {
    private _bytes = 0;

    async getTotalBytesTransferred(): Promise<number> {
        return this._bytes;
    }

    async addBytesTransferred(bytes: number): Promise<void> {
        this._bytes = this._bytes + bytes;
    }

    async clearTotalBytesTransferred(): Promise<void> {
        this._bytes = 0;
    }
}
