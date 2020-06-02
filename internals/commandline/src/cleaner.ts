import del from "del";
import parser from "minimist";

import { AsyncRunner, Setting } from ".";

type Settings = {
  all: boolean;
};

const setting = new Setting({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data }) => {
    const argument = parser(data);

    return {
      all: argument.all ?? false,
    } as Settings;
  },
});

const runner = new AsyncRunner(setting, async ({ helper, data }) => {
  const logs = helper.parentPath("**/*.log");
  const lib = helper.parentPath("lib");

  const tsbuildinfo = helper.parentPath("*.tsbuildinfo");
  const buildinfo = helper.parentPath("*.buildinfo");
  const build = helper.parentPath("*.build");

  const coverage = helper.parentPath("coverage");
  const junit = helper.parentPath("junit.xml");
  const eslint = helper.parentPath("eslint.xml");

  const arr = [logs, lib, tsbuildinfo, buildinfo, build, coverage, junit, eslint];
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

runner.start();
