jest.mock("./src/data/recording/RecordingRepository", () => ({
    RecordingRepository: {
        isOngoingCalculation: jest.fn(),
        setOngoingCalculation: jest.fn(),
        setStartUnixTime: jest.fn(),
        clearStartUnixTime: jest.fn(),
        getStartUnixTime: jest.fn(),
    },
}));
