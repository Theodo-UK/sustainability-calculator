/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    testEnvironment: "jsdom",
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
    testMatch: ["<rootDir>/src/**/__tests__/*.test.{js,jsx,ts,tsx}"],
    moduleDirectories: ["src", "node_modules"],
    moduleFileExtensions: ["ts", "tsx", "js"],

    coverageDirectory: "coverage",
    preset: "ts-jest",
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
        "^.+\\.svg$": "jest-transformer-svg",
    },
};
