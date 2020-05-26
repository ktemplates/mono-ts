import { resolve } from "path";
import { existsSync } from "fs";

type CommandHelperOption = { root: string; parent: string; current: string };

export class CommandHelper {
  constructor(private opts: CommandHelperOption) {}

  rootNodeModulesCommand(name: string) {
    return this.rootPath("node_modules", ".bin", name);
  }

  currentPath(...name: string[]) {
    return resolve(this.opts.current, ...name);
  }

  rootPath(...name: string[]) {
    return resolve(this.opts.root, ...name);
  }

  parentPath(...name: string[]) {
    return resolve(this.opts.parent, ...name);
  }

  check(path: string) {
    return existsSync(path);
  }
}
