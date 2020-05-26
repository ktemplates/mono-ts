import { DependencyCategory } from "../models/dependencies/DependencyCategory";

export type Query = {
  [name in DependencyCategory]?: RegExp;
};

export class DependenciesClassify {
  private query: Query;
  constructor(_query?: Query) {
    const query: Query = {};
    query[DependencyCategory.TYPE] = /@types.*/;
    query[DependencyCategory.INTERNAL] = /@internal\/.*/;

    if (_query !== undefined && _query !== null) {
      this.query = { ...query, ..._query };
    } else {
      this.query = query;
    }
  }

  type(name: string, version: string): DependencyCategory {
    return (
      (Object.keys(this.query).find(t => {
        const regex: RegExp = this.query[t as DependencyCategory] as RegExp;
        return regex.test(name) || regex.test(version);
      }) as DependencyCategory) ?? DependencyCategory.UNKNOWN
    );
  }
}
