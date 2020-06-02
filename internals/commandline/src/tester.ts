import { AsyncRunner, Commandline, Option } from ".";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper }) => {
  const jest = helper.rootNodeModulesCommand("jest");
  const config = helper.parentPath("jest.config.js");

  if (helper.check(config)) {
    const args = [jest, "--config", config, "--passWithNoTests"];
    const ci = process.env.CI === "true";
    if (ci) args.push("--ci", "--runInband");

    return args;
  } else {
    return ["echo", `[skip] jest config not found (${config})`];
  }
});

const cli = new Commandline(transformer);
cli.start();
