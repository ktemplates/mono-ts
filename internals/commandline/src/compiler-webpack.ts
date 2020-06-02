import { AsyncRunner, Commandline, Option } from ".";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper }) => {
  const config = helper.parentPath("webpack.config.js");
  if (helper.check(config)) {
    return [helper.rootNodeModulesCommand("webpack"), "--config", config];
  } else {
    return ["echo", `[skip] webpack config not found (${config})`];
  }
});

const cli = new Commandline(transformer);
cli.start();
