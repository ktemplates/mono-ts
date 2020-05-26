import { Command } from "./models/Command";
import { Commandline } from "./models/Commandline";

const cli = new Command(process.cwd(), new Commandline());
cli.build(({ helper }) => {
  const jest = helper.rootNodeModulesCommand("jest");
  const config = helper.parentPath("jest.config.js");

  if (helper.check(config)) {
    const args = [jest, "--config", config, "--passWithNoTests"];
    const ci = process.env.CI === "true";
    if (ci) {
      args.push("--ci", "--runInband");
    }

    return args;
  } else {
    return ["echo", `[skip] jest config not found (${config})`];
  }
});

cli.start(process.argv.slice(2));
