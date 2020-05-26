export enum DependencyCategory {
  APPLICATION = "application",
  CORE = "core",
  LIBRARY = "library",
  STACK = "stack",
  INTERNAL_STACK = "internal-stack",
  TYPE = "type",
  UNKNOWN = "unknown",
}

export class DependencyCategories {
  static by(name: string) {
    if (/@types.*/.test(name)) return DependencyCategory.TYPE;

    if (/@nmsys\/internal.*/.test(name)) return DependencyCategory.INTERNAL_STACK;
    if (/@nmsys\/stack.*/.test(name)) return DependencyCategory.STACK;
    if (/@nmsys\/lib.*/.test(name)) return DependencyCategory.LIBRARY;
    if (/@nmsys\/app.*/.test(name)) return DependencyCategory.APPLICATION;

    return DependencyCategory.CORE;
  }
}
