/* eslint-disable @typescript-eslint/no-explicit-any */

export class StorageRemoteDataSource {
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

    async get(
        data: string | string[] | { [key: string]: any } | null
    ): Promise<{ [key: string]: any }> {
        try {
            return await this.storage.read(data).then(async (result: any) => {
                if (typeof data === "object" && data !== null) {
                    const resultWithDefault = result as { [key: string]: any };

                    for (const key in data) {
                        if (!(key in result)) {
                            resultWithDefault[key] = result[key];
                        }
                    }
                    await this.storage.write(resultWithDefault);
                    return resultWithDefault;
                }
                return result;
            });
        } catch (e) {
            throw new Error("getTotalBytesTransferred failed: " + e);
        }
    }

    async set(data: { [key: string]: any }): Promise<void> {
        try {
            await this.storage.write(data);
        } catch (e) {
            throw new Error("addBytesTransferred failed: " + e);
        }
    }

    async clear(): Promise<void> {
        try {
            await this.storage.clear();
        } catch (e) {
            throw new Error("clearTotalBytesTransferred failed: " + e);
        }
    }
}
