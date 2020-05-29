import { Commandline } from "./commands/Commandline";
import { Transformer } from "./models/Transformer";
import { Option } from "./models/Option";

const option = new Option(process.cwd(), process.argv.slice(2), Option.defaultTransformer);
const transformer = new Transformer(option, ({ helper, data }) => {
  return [helper.rootNodeModulesCommand("tsc"), "--project", helper.currentPath("includes"), ...data];
});

const cli = new Commandline(transformer);
cli.start();
