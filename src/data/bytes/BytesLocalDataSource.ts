export class BytesLocalDataSource {
    private _bytes = 0;

    getBytesTransferred(): number {
        return this._bytes;
    }
    addBytesTransferred(bytes: number): void {
        this._bytes += bytes;
    }
    clearBytesTransferred(): void {
        this._bytes = 0;
    }
}
