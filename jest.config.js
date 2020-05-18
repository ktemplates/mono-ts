// ######################################################################## //
// ######################################################################## //
// ##                                                                    ## //
// ##            This configuration is for CI to run the test            ## //
// ##                                                                    ## //
// ######################################################################## //
// ######################################################################## //

// for ci to run test
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: ["default", "jest-junit"],
  collectCoverage: true,
  collectCoverageFrom: [
    "packages/**/*.{ts,tsx}",
    "!internals/**/*.{ts,tsx}"
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
