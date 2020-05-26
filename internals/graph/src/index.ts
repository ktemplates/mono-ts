import { getPackages } from "@lerna/project";
import { resolve } from "path";
import { Graph } from "./models/Graph";
import { InternalDependency } from "./models/dependencies/InternalDependency";
import { Dependencies } from "./models/dependencies/Dependencies";
import { DependenciesClassify, Query } from "./constants/classify";
import { DependencyCategory } from "./models/dependencies/DependencyCategory";
import { ExternalDependencies } from "./models/dependencies/ExternalDependency";

getPackages(resolve(__dirname, "..", "..", "..")).then(_packages => {
  const graph = new Graph("Deps");

  const externalModels: Query = {};
  externalModels[DependencyCategory.LIBRARY] = /(del)/;
  externalModels[DependencyCategory.TYPE] = /(@types)/;
  const externalClassify = new DependenciesClassify(externalModels);

  const internalModels: Query = {};
  const internalClassify = new DependenciesClassify(internalModels);

  const dependencies = new Dependencies();

  _packages.forEach(p => dependencies.add(new InternalDependency(p, internalClassify)));

  _packages.forEach(p => {
    const d = dependencies.get(p.name);
    if (d) {
      const deps = ExternalDependencies.from(externalClassify, p.dependencies || {}, dependencies);
      const devDeps = ExternalDependencies.from(externalClassify, p.devDependencies || {}, dependencies);
      const peerDeps = ExternalDependencies.from(externalClassify, p.peerDependencies || {}, dependencies);

      deps.forEach(dd => d.addDependOn(dd));
      devDeps.forEach(dd => d.addDevDependOn(dd));
      peerDeps.forEach(dd => d.addPeerDependOn(dd));
    }
  });

  graph.visualize(dependencies);
  console.log(graph.toString());
  graph.toPDF(process.cwd());
});
