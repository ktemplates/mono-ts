import { getPackages } from "@lerna/project";
import { resolve } from "path";
import { Graph } from "./models/Graph";
import { InternalDependency } from "./models/dependencies/InternalDependency";
import { Dependencies } from "./models/dependencies/Dependencies";
import { ExternalDependenciesClassify, Query } from "./constants/external";
import { DependencyCategory } from "./models/dependencies/DependencyCategory";
import { ExternalDependencies } from "./models/dependencies/ExternalDependency";

getPackages(resolve(__dirname, "..", "..", "..")).then((_packages) => {
  const graph = new Graph("Deps");

  const classify: Query = {};
  classify[DependencyCategory.LIBRARY] = /(del)/;
  classify[DependencyCategory.TYPE] = /(@types)/;
  const externalDependenciesClassify = new ExternalDependenciesClassify(classify);

  const internalDependencies = new Dependencies();
  _packages.forEach((p) => internalDependencies.add(new InternalDependency(p)));

  _packages.forEach((p) => {
    const d = internalDependencies.get(p.name);
    if (d) {
      const deps = ExternalDependencies.from(externalDependenciesClassify, p.dependencies || {}, internalDependencies);
      const devDeps = ExternalDependencies.from(
        externalDependenciesClassify,
        p.devDependencies || {},
        internalDependencies,
      );
      const peerDeps = ExternalDependencies.from(
        externalDependenciesClassify,
        p.peerDependencies || {},
        internalDependencies,
      );

      deps.forEach((dd) => d.addDependOn(dd));
      devDeps.forEach((dd) => d.addDevDependOn(dd));
      peerDeps.forEach((dd) => d.addPeerDependOn(dd));
    }
  });

  graph.visualize(internalDependencies);

  console.log(graph.toString());
  graph.toPDF(process.cwd());
});
