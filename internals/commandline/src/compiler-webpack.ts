import { Commandline } from "./commands/Commandline";
import { Transformer } from "./models/Transformer";
import { Option } from "./models/Option";

const option = new Option(process.cwd(), process.argv.slice(2), Option.defaultTransformer);
const transformer = new Transformer(option, ({ helper }) => {
  const config = helper.parentPath("webpack.config.js");
  if (helper.check(config)) {
    return [helper.rootNodeModulesCommand("webpack"), "--config", config];
  } else {
    return ["echo", `[skip] webpack config not found (${config})`];
  }
});

const cli = new Commandline(transformer);
cli.start();
