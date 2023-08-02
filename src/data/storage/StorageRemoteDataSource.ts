/* eslint-disable @typescript-eslint/no-explicit-any */

export class StorageRemoteDataSource {
    private storage = (() => {
        let mutex: Promise<void> | null = Promise.resolve();
        const API = chrome.storage.local;
        const mutexExec = (method: () => any): any => {
            mutex = Promise.resolve(mutex)
                .then(() => method())
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
                mutexExec(() => syncGet(data)),
            write: (data: any) => mutexExec(() => syncSet(data)),
            clear: () => mutexExec(() => syncClear()),
        };
    })();

    async get(key: string, defaultValue: any): Promise<any> {
        try {
            return await this.storage.read(key).then(async (result: any) => {
                if (!(key in result)) {
                    await this.storage.write({ key: defaultValue });
                    return defaultValue;
                }
                return result[key];
            });
        } catch (error) {
            throw new Error(
                `StorageRemoteDataSource failed to get: ${key}: ${error}`
            );
        }
    }

    async set(data: { [key: string]: any }): Promise<void> {
        try {
            await this.storage.write(data);
        } catch (error) {
            throw new Error(
                `StorageRemoteDataSource failed to set: ${data}: ${error}`
            );
        }
    }

    async clear(): Promise<void> {
        try {
            await this.storage.clear();
        } catch (error) {
            throw new Error(
                `StorageRemoteDataSource failed to clear: ${error}`
            );
        }
    }
}
