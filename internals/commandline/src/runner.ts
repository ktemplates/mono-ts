import { Command } from "./models/Command";
import { Commandline } from "./models/Commandline";

const cli = new Command(process.cwd(), new Commandline());
cli.build(({ helper }) => {
  return ["node", helper.parentPath("lib", "index.js")];
});

cli.start(process.argv.slice(2));
