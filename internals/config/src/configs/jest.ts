import { ConfigBuilder } from "../models/ConfigBuilder";
import { Config } from "../models/Config";

interface JestConfig {
  verbose: boolean;
  preset: string;
  testEnvironment: string;
  rootDir: string;
  collectCoverage: boolean;
  collectCoverageFrom: string[];
  coverageReporters: string[];
}

const jest: ConfigBuilder<void, JestConfig> = {
  default: void 0,
  transformer: ({ helper }) => {
    return {
      verbose: true,
      rootDir: helper.parentPath(),
      preset: "ts-jest",
      testEnvironment: "node",
      reporters: ["default", "jest-junit"],
      collectCoverage: true,
      collectCoverageFrom: ["**/*.{ts,tsx}"],
      coveragePathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
      coverageReporters: ["json", "lcov", "text", "clover"],
    };
  },
};

export default (dir?: string, input?: void) => new Config(jest, input, dir);
