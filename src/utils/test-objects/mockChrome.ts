export const mockTabId = 123;
export const mockChrome = {
    tabs: {
        query: jest.fn().mockImplementation((options, callback) => {
            const tabs = [{ id: mockTabId }];
            callback(tabs);
        }),

        reload: jest.fn().mockImplementation((tabId, options, callback) => {
            callback();
        }),
    },
    runtime: {
        onMessage: {
            addListener: jest.fn(),
            removeListener: jest.fn(),
        },
        sendMessage: jest.fn(),
    },
    storage: {
        local: {
            get: jest.fn(),
            set: jest.fn(),
            onChanged: {
                addListener: jest.fn(),
                removeListener: jest.fn(),
            },
        },
    },
};
