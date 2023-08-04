/* eslint-disable @typescript-eslint/no-unused-vars */
export const mockTabId = 123;
export const mockChrome = {
    tabs: {
        query: jest.fn().mockImplementation(async (options) => {
            const tabs = [{ id: mockTabId }];
            return tabs;
        }),

        reload: jest.fn().mockImplementation(async (tabId, options) => {
            return;
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
