// ######################################################################## //
// ######################################################################## //
// ##                                                                    ## //
// ##            This configuration is for CI to run the test            ## //
// ##                                                                    ## //
// ######################################################################## //
// ######################################################################## //

const { jest } = require("@kcinternal/configuration");
const config = jest(__dirname, { root: true }).build();

config.testPathIgnorePatterns.push("/.cache/");
config.coveragePathIgnorePatterns.push("/.cache/");

module.exports = config;
