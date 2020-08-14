const jest = require("@kcinternal/configuration").jest;
const config = jest(__dirname).build();

config.testPathIgnorePatterns.push("/.cache/");

console.log(config);
module.exports = config;
