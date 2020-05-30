const config = require("@internal/configuration").webpack;
module.exports = config(__dirname, { react: true, index: "index.ts" });
