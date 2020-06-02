import { basename, dirname, resolve } from "path";
import { promisify } from "util";
import { existsSync, exists as _exists, readFileSync, readFile as _readFile } from "fs";

type HelperOption = { root: string; parent: string; current: string };

const exists = promisify(_exists);
const readFile = promisify(_readFile);

export class Helper {
  constructor(private opts: HelperOption) {}

  rootNodeModulesCommand(name: string) {
    return this.rootPath("node_modules", ".bin", name);
  }

  parentBaseName(scope: boolean = true) {
    if (this.opts.parent.includes("@") && scope) {
      const dirpath = dirname(this.opts.parent);

      const dir = basename(dirpath);
      const base = basename(this.opts.parent);
      return `${dir}/${base}`;
    }

    return basename(this.opts.parent);
  }

  loadParentPackageJsonSync() {
    const p = this.parentPath("package.json");
    if (this.checkSync(p)) {
      return JSON.parse(readFileSync(p, { encoding: "utf-8" }));
    }
    return {}; // empty json
  }

  async loadParentPackageJson() {
    const p = this.parentPath("package.json");
    const check = await this.check(p);
    if (check) {
      const json = await readFile(p, { encoding: "utf-8" });
      return JSON.parse(json);
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

  checkSync(path: string) {
    return existsSync(path);
  }

  check(path: string) {
    return exists(path);
  }
}
