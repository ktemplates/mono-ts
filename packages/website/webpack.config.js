const webpack = require("@kcinternal/configuration").webpack;
const config = webpack(__dirname, {
  target: "node",
  react: true,
  index: "index.ts",
}).build();

config.output.globalObject = "window";

// console.log(config);
module.exports = config;
