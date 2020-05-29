import { resolve } from "path";

import { CommandHelper } from "./CommandHelper";
import { DataTransformer } from "./Data";
import { RawFunction } from "./RawFunction";
import { optionTransformer } from "./Default";

const pjson = require("../../package.json");
const name = pjson.name.split("/");

export type OptionType = string[];

export class Option<O> extends RawFunction<string[], O> {
  static defaultTransformer = optionTransformer;

  private helper: CommandHelper;
  constructor(dirname: string, private others: OptionType, transformer: DataTransformer<OptionType, O>) {
    super(transformer);

    const parent = resolve(dirname);
    const root = resolve(parent, "..", "..");
    const current = resolve(parent, "node_modules", ...name);

    this.helper = new CommandHelper({ root: root, parent: parent, current: current });
  }

  getHelper() {
    return this.helper;
  }

  getData() {
    return Promise.resolve(this.others);
  }
}
