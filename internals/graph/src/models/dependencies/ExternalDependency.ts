import { Dependency } from "./Dependency";
import { DependencyCategory } from "./DependencyCategory";
import { DependencyType } from "./DependencyType";
import { ExternalDependenciesClassify } from "../../constants/external";
import { Dependencies } from "./Dependencies";

export class ExternalDependency extends Dependency {
  constructor(name: string, version: string, category: DependencyCategory) {
    super(name, version, DependencyType.EXTERNAL, category);
  }
}

export class ExternalDependencies {
  static from(
    classify: ExternalDependenciesClassify,
    p: Record<string, string>,
    internal: Dependencies,
  ): ExternalDependency[] {
    return Object.keys(p)
      .map((name) => {
        const i = internal.get(name);
        if (i) return i;

        const version = p[name];
        return new ExternalDependency(name, version, classify.type(name, version));
      })
      .filter((v) => v.category !== DependencyCategory.UNKNOWN);
  }
}
