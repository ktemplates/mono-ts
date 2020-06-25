// ######################################################################## //
// ######################################################################## //
// ##                                                                    ## //
// ##            This configuration is for CI to run the test            ## //
// ##                                                                    ## //
// ######################################################################## //
// ######################################################################## //

const { jest } = require("@kcinternal/configuration");
const config = jest(__dirname, { root: true }).build();

console.log(config);
module.exports = config;

// for ci to run test
// module.exports = {
//   verbose: true,
//   preset: "ts-jest",
//   testEnvironment: "node",
//   reporters: ["default", "jest-junit"],
//   collectCoverage: true,
//   collectCoverageFrom: [
//     "packages/**/*.{ts,tsx}",
//     "!internals/**/*.{ts,tsx}",
//     "!typings/**/*.{ts,tsx}",
//   ],
//   coveragePathIgnorePatterns: ["/node_modules/", "/lib/"],
//   coverageReporters: ["json", "lcov", "text", "clover"],
// };
