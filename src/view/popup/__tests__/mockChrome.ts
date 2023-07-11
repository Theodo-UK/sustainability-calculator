export const mockChrome = {
    tabs: {
        query: jest.fn(),
        reload: jest.fn(),
    },
    runtime: {
        onMessage: {
            addListener: jest.fn(),
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
