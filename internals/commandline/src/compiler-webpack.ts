import { Command } from "./models/Command";
import { Commandline } from "./models/Commandline";

const cli = new Command(process.cwd(), new Commandline());
cli.build(({ helper }) => {
  return [helper.rootNodeModulesCommand("webpack"), "--config", helper.parentPath("webpack.config.js")];
});

cli.start(process.argv.slice(2));
