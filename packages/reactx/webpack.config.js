const webpack = require("@internal/configuration").webpack;
module.exports = webpack(__dirname, { react: true }).build();
