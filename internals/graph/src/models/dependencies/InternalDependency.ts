import { Dependency } from "./Dependency";
import { DependencyCategories } from "./DependencyCategory";
import { DependencyType } from "./DependencyType";
import { Package } from "@lerna/package";

export class InternalDependency extends Dependency {
  constructor(p: Package) {
    super(p.name, p.version, DependencyType.INTERNAL, DependencyCategories.by(p.name));
  }
}
