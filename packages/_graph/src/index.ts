import { builder, Classify, QueryBuilder, DependencyCategory } from "@kcinternal/graph";

const externalModels = new QueryBuilder();
// externalModels.add(DependencyCategory.CORE, /(graphviz|lerna)/);
externalModels.add(DependencyCategory.LIBRARY, /(react|kcutils)/);
const external = new Classify(externalModels, true);

const internalModels = new QueryBuilder();
internalModels.add(DependencyCategory.INTERNAL, /(graph|example)/);
internalModels.add(DependencyCategory.LIBRARY, /(utils|reactx)/);
internalModels.add(DependencyCategory.CORE, /(core)/);
internalModels.add(DependencyCategory.APPLICATION, /(website)/);
const internal = new Classify(internalModels, true);

(async () => {
  const graph = await builder({ root: process.cwd(), name: "Deps", external, internal });

  try {
    await graph.toPDF();
  } catch (e) {
    console.error(e);
  }
})();
