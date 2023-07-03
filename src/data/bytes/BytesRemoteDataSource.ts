export class BytesRemoteDataSource {
    // https://stackoverflow.com/questions/62522824/how-to-add-records-to-chrome-storage-local-without-overriding-other-write-operat
    private storage = (() => {
        let mutex: Promise<void> | null = Promise.resolve();
        const API = chrome.storage.local;
        const mutexExec = (method: any, data: any): any => {
            mutex = Promise.resolve(mutex)
                .then(() => method(data))
                .then((result) => {
                    mutex = null;
                    return result;
                });
            return mutex;
        };

        const syncGet = (
            data: string | string[] | { [key: string]: any } | null
        ) => new Promise((resolve) => API.get(data, resolve));

        const syncSet = (data: { [key: string]: any }) =>
            new Promise((resolve) => API.set(data, () => resolve(null)));

        const syncClear = () =>
            new Promise((resolve) => API.clear(() => resolve(null)));

        return {
            read: (data: string | string[] | { [key: string]: any } | null) =>
                mutexExec(syncGet, data),
            write: (data: any) => mutexExec(syncSet, data),
            clear: () => mutexExec(syncClear, null),
        };
    })();

    async getTotalBytesTransferred(): Promise<number> {
        try {
            const data = await this.storage.read(null);
            const totalBytesTransferred = data.totalBytesTransferred;
            if (totalBytesTransferred === undefined) {
                await this.storage.write({ totalBytesTransferred: 0 });
                return 0;
            }
            return totalBytesTransferred;
        } catch (e) {
            throw new Error("getTotalBytesTransferred failed: " + e);
        }
    }

    async addBytesTransferred(bytes: number): Promise<void> {
        try {
            const data = await this.storage.read(null);
            const totalBytesTransferred = data.totalBytesTransferred;
            if (totalBytesTransferred === undefined) {
                throw new Error("totalBytesTransferred is undefined");
            }
            await this.storage.write({
                totalBytesTransferred: totalBytesTransferred + bytes,
            });
        } catch (e) {
            throw new Error("addBytesTransferred failed: " + e);
        }
    }

    async clearTotalBytesTransferred(): Promise<void> {
        try {
            await this.storage.write({ totalBytesTransferred: 0 });
        } catch (e) {
            throw new Error("clearTotalBytesTransferred failed: " + e);
        }
    }
}
