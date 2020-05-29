import { resolve } from "path";
import { existsSync, readFileSync } from "fs";

type CommandHelperOption = { root: string; parent: string; current: string };

export class CommandHelper {
  constructor(private opts: CommandHelperOption) {}

  rootNodeModulesCommand(name: string) {
    return this.rootPath("node_modules", ".bin", name);
  }

  loadParantPackageJson() {
    const p = this.parentPath("package.json");
    if (this.check(p)) {
      return JSON.parse(readFileSync(p, { encoding: "utf-8" }));
    }
    return {}; // empty json
  }

  /**
   * top level of mono repository
   * @param name custom relative path name from top level
   */
  rootPath(...name: string[]) {
    return resolve(this.opts.root, ...name);
  }

  /**
   * commandline project
   * @param name custom relative path name from commandline project
   */
  currentPath(...name: string[]) {
    return resolve(this.opts.current, ...name);
  }

  /**
   * running project
   * @param name custom relative path name from running project
   */
  parentPath(...name: string[]) {
    return resolve(this.opts.parent, ...name);
  }

  check(path: string) {
    return existsSync(path);
  }
}
