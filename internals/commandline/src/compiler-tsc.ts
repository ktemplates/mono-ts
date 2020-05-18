import { Command } from "./models/Command";
import { Commandline } from "./models/Commandline";

const cli = new Command(process.cwd(), new Commandline());
cli.build(({ helper }) => {
  return [helper.rootNodeModulesCommand("tsc"), "--project", helper.currentPath("includes")];
});

cli.start(process.argv.slice(2));
