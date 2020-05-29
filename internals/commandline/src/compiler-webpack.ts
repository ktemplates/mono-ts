import { Command } from "./models/Command";
import { Commandline } from "./models/Commandline";

const cli = new Command(process.cwd(), new Commandline());
cli.build(({ helper }) => {
  const config = helper.parentPath("webpack.config.js");
  if (helper.check(config)) {
    return [helper.rootNodeModulesCommand("webpack"), "--config", helper.parentPath("webpack.config.js")];
  } else {
    return ["echo", `[skip] webpack config not found (${config})`];
  }
});

cli.start(process.argv.slice(2));
