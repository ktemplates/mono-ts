import { Package } from "@lerna/package";

import { Dependency } from "./Dependency";
import { DependencyType } from "./DependencyType";

import { DependenciesClassify } from "../../constants/classify";

export class InternalDependency extends Dependency {
  constructor(p: Package, classify: DependenciesClassify) {
    super(p.name, p.version, DependencyType.INTERNAL, classify.type(p.name, p.version));
  }
}
