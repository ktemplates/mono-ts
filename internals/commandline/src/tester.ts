import { Commandline } from "./commands/Commandline";
import { Transformer } from "./models/Transformer";
import { Option } from "./models/Option";

const option = new Option(process.cwd(), process.argv.slice(2), Option.defaultTransformer);
const transformer = new Transformer(option, ({ helper }) => {
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
