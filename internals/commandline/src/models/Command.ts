import { resolve } from "path";

import { CommandHelper } from "./CommandHelper";
import { Execution } from "./Execution";

const pjson = require("../../package.json");
const name = pjson.name.split("/");

type BuilderOption = { helper: CommandHelper };
type BuilderFn<R> = (opts: BuilderOption) => R;

export class Command<I, R, O = any> {
  private root: string;
  private parent: string;
  private current: string;

  private helper: CommandHelper;

  private caches?: I;

  constructor(dirname: string, private execution: Execution<I, R, O>) {
    this.parent = resolve(dirname);

    this.root = resolve(this.parent, "..", "..");

    this.current = resolve(this.parent, "node_modules", ...name);

    this.helper = new CommandHelper({ root: this.root, parent: this.parent, current: this.current });
  }

  build(fn: BuilderFn<I>) {
    this.caches = fn({ helper: this.helper });
  }

  start(options?: O) {
    if (this.caches) return this.execution.run(this.caches, options);
    else throw new Error("never build before");
  }
}
