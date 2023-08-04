export const BytesRepository = {
    bytes: 0,

    getBytesTransferred(): number {
        return this.bytes;
    },
    addBytesTransferred(bytes: number): void {
        this.bytes += bytes;
    },
    clearBytesTransferred(): void {
        this.bytes = 0;
    },
};
