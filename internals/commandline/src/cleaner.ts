import del from "del";
import parser from "minimist";

import { Transformer } from "./models/Transformer";
import { Option } from "./models/Option";
import { Runner } from "./commands/Runner";

const option = new Option(process.cwd(), process.argv.slice(2), ({ data }) => {
  const argument = parser(data);

  return {
    all: argument.all as boolean,
  };
});

const transformer = new Transformer(option, async ({ helper, data }) => {
  const logs = helper.parentPath("**/*.log");
  const lib = helper.parentPath("lib");

  const buildinfo = helper.parentPath("*.buildinfo");
  const build = helper.parentPath("*.build");
  const junit = helper.parentPath("junit.xml");
  const eslint = helper.parentPath("eslint.xml");

  const arr = [logs, lib, buildinfo, build, junit, eslint];
  if (data.all) {
    const nodeModules = helper.parentPath("node_modules");
    const lock = helper.parentPath("yarn.lock");
    arr.push(nodeModules, lock);
  }

  const deletedPaths = await del(arr);
  deletedPaths.forEach((v, i) => {
    console.log(`${i + 1}) remove ${v}`);
  });
});

const runner = new Runner(transformer);
runner.start();
