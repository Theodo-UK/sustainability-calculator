import { StorageRemoteDataSource } from "../StorageRemoteDataSource";
const timeout = 5000;
jest.useFakeTimers();
describe("StorageRemoteDataSource", () => {
    let mockStorage: { [key: string]: any } = {};
    const mockChrome = {
        storage: {
            local: {
                get: jest.fn((keys, callback) => {
                    callback(mockStorage);
                }),
                set: jest.fn((data, callback) => {
                    mockStorage = { ...mockStorage, ...data };
                    callback();
                }),
                clear: jest.fn(() => {
                    return new Promise<void>((resolve) => {
                        setTimeout(() => {
                            mockStorage = {};
                            resolve();
                        }, 100);
                    });
                }),
            },
        },
    };
    (global as any).chrome = mockChrome;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get data from storage", async () => {
        mockStorage = { key1: "value1", key2: "value2" };
        const dataSource = new StorageRemoteDataSource();
        const data = await dataSource.get(["key1", "key2"]);
        expect(data).toEqual(mockStorage);
    });

    it("should set data in storage", async () => {
        const dataSource = new StorageRemoteDataSource();
        await dataSource.set({ key1: "value1", key2: "value2" });
        expect(mockStorage).toEqual({ key1: "value1", key2: "value2" });
    });

    it(
        "should clear data from storage",
        async () => {
            mockStorage = { key1: "value1", key2: "value2" };
            const dataSource = new StorageRemoteDataSource();
            await dataSource.clear();

            jest.runAllTimers(); // this test fails, see: https://stackoverflow.com/questions/51126786/jest-fake-timers-with-promises/59243586#59243586

            expect(mockStorage).toEqual({});
        },
        timeout
    );
});
