module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.+(spec|test).ts?(x)"],
  modulePathIgnorePatterns: ["<rootDir>/.aws-sam"],
  clearMocks: true,
  reporters: ["default", "jest-junit"],
  coverageThreshold: {
    global: {
      statements: 0,
    },
  },
  collectCoverage: false,
  collectCoverageFrom: ["./src/**/*"],
  coveragePathIgnorePatterns: ["index.ts", "config.ts"],
};
