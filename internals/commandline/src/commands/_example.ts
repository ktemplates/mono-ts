import { Option } from "../models/Option";
import { optionTransformer } from "../models/Default";
import { Transformer } from "../models/Transformer";
import { Commandline } from "./Commandline";
import { Execution } from "../models/Execution";
import { Runner } from "./Runner";

// default option object
const option = new Option(process.cwd(), process.argv, optionTransformer);

// ------------------------------- //
// Commandline implementation
// ------------------------------- //

(async () => {
  const transformer = new Transformer(option, ({ data }) => {
    return data;
  });

  const cli = new Commandline(transformer);
  await cli.start();
})();

// ------------------------------- //
// Custom execution
// ------------------------------- //

(async () => {
  const transformer = new Transformer(option, ({ data }) => {
    return data;
  });

  const custom = new Execution(transformer, ({ data }) => {
    return data.transform;
  });
  await custom.start();
})();

// ------------------------------- //
// RawFunction runner
// ------------------------------- //

(async () => {
  const transformer = new Transformer(option, ({ data }) => {
    return data;
  });

  const cli = new Commandline(transformer);

  // run option
  const runner1 = new Runner(option);
  runner1.start();

  // run transformer
  const runner2 = new Runner(transformer);
  runner2.start();

  // run execution
  const runner3 = new Runner(cli);
  runner3.start();
})();
