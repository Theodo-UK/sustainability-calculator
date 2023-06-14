/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,

  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/features/**/use*.{js,jsx,ts,tsx}",
    "<rootDir>/src/helpers/**/*.{js,jsx,ts,tsx}"
],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },

  moduleDirectories: ["src", "node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js"],

  coverageDirectory: "coverage",
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
