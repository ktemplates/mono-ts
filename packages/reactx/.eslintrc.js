const eslint = require("@internal/configuration").eslint;
module.exports = eslint(__dirname, { react: true }).build();
