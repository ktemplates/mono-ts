import parser from "minimist";

import { AsyncRunner, Commandline, Option } from ".";

type Settings = {
  index: string;
};

const option = new Option({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data }) => {
    const argument = parser(data);

    return {
      index: argument.index ?? "index.js",
    } as Settings;
  },
});

const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  const runner = helper.parentPath("lib", data.index);
  if (helper.check(runner)) {
    return ["node", runner];
  } else {
    return ["echo", `[skip] ${data.index} not found`];
  }
});

const cli = new Commandline(transformer);
cli.start();
