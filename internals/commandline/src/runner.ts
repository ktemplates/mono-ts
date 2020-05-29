import { Command } from "./models/Command";
import { Commandline } from "./models/Commandline";

const cli = new Command(process.cwd(), new Commandline());
cli.build(({ helper }) => {
  const runner = helper.parentPath("lib", "index.js");

  if (helper.check(runner)) {
    return ["node", helper.parentPath("lib", "index.js")];
  } else {
    return ["echo", `[skip] index.js not found`];
  }
});

cli.start(process.argv.slice(2));
