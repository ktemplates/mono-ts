import { ConfigFunction } from "../models/ConfigFn";

interface JestConfig {
  verbose: boolean;
  preset: string;
  testEnvironment: string;
  rootDir: string;
  collectCoverage: boolean;
  collectCoverageFrom: string[];
  coverageReporters: string[];
}

const jest: ConfigFunction<void, JestConfig> = _root => {
  return {
    verbose: true,
    rootDir: _root ?? process.cwd(),
    preset: "ts-jest",
    testEnvironment: "node",
    reporters: ["default", "jest-junit"],
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{ts,tsx}"],
    coveragePathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
    coverageReporters: ["json", "lcov", "text", "clover"],
  };
};

export default jest;
