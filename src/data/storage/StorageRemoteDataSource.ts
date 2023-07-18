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

        const getAndSet = (key: string, mutateValue: (value: any) => any) => {
            return new Promise((resolve) => {
                syncGet(key).then((currentValue: any) => {
                    const newValue = mutateValue(currentValue);
                    syncSet({ [key]: newValue }).then(() => resolve(null));
                });
            });
        };

        return {
            read: (data: string | string[] | { [key: string]: any } | null) =>
                mutexExec(() => syncGet(data)),
            write: (data: any) => mutexExec(() => syncSet(data)),
            clear: () => mutexExec(() => syncClear()),
            readAndWrite: (key: string, mutateValue: (value: any) => any) =>
                mutexExec(() => getAndSet(key, mutateValue)),
        };
    })();

    async getAndSet(
        key: string,
        mutateValue: (value: any) => any
    ): Promise<void> {
        try {
            await this.storage.readAndWrite(key, mutateValue);
        } catch (e) {
            throw new Error(
                `StorageRemoteDataSource failed to getAndSet: ${key}: ${e}`
            );
        }
    }

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
            throw new Error(
                `StorageRemoteDataSource failed to get: ${data}: ${e}`
            );
        }
    }

    async set(data: { [key: string]: any }): Promise<void> {
        try {
            await this.storage.write(data);
        } catch (e) {
            throw new Error(
                `StorageRemoteDataSource failed to set: ${data}: ${e}`
            );
        }
    }

    async clear(): Promise<void> {
        try {
            await this.storage.clear();
        } catch (e) {
            throw new Error(`StorageRemoteDataSource failed to clear: ${e}`);
        }
    }
}
