import parser from "minimist";

import { Commandline } from "./commands/Commandline";
import { Transformer } from "./models/Transformer";
import { Option } from "./models/Option";

const option = new Option(process.cwd(), process.argv.slice(2), ({ data }) => {
  const argument = parser(data);

  return {
    index: argument.index ?? "index.js",
  };
});

const transformer = new Transformer(option, ({ helper, data }) => {
  const runner = helper.parentPath("lib", data.index);
  if (helper.check(runner)) {
    return ["node", runner];
  } else {
    return ["echo", `[skip] ${data.index} not found`];
  }
});

/// irunner [--index [index.js]]
const cli = new Commandline(transformer);
cli.start();
