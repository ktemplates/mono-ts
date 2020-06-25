// ######################################################################## //
// ######################################################################## //
// ##                                                                    ## //
// ##            This configuration is for CI to run the test            ## //
// ##                                                                    ## //
// ######################################################################## //
// ######################################################################## //

const { jest } = require("@kcinternal/configuration");
const config = jest(__dirname, { root: true }).build();
module.exports = config;

// const {jest} = require('@kcinternal/configuration')
// module.exports = jest(__dirname).build()
// // for ci to run test
// module.exports = {
//   verbose: true,
//   preset: "ts-jest",
//   testEnvironment: "node",
//   reporters: ["default", "jest-junit"packages/**/*.{ts,tsx}", "!internals/**/*.{ts,tsx}", "!typings/**/*.{ts,tsx}"nals/**/*.{ts,tsx}",
//     "!typings/**/*.{ts,tsx}",
//   ],
//   coveragePathIgnorePatterns: ["/node_modules/", "/lib/"],
//   coverageReporters: ["json", "lcov", "text", "clover"],
// };
