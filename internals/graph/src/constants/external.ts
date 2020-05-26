import { DependencyCategory } from "../models/dependencies/DependencyCategory";

export type Query = {
  [name in DependencyCategory]?: RegExp;
};

export class ExternalDependenciesClassify {
  constructor(private query: Query) {}

  type(name: string, version: string): DependencyCategory {
    return (
      (Object.keys(this.query).find((t) => {
        const regex: RegExp = this.query[t as DependencyCategory] as RegExp;
        return regex.test(name) || regex.test(version);
      }) as DependencyCategory) ?? DependencyCategory.UNKNOWN
    );
  }
}
