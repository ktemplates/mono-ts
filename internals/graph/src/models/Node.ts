import graphviz from "graphviz";

import { Dependency } from "./dependencies/Dependency";
import { Stylist } from "./styles/Stylist";
import { DependencyType } from "./dependencies/DependencyType";
import { DependencyCategory } from "./dependencies/DependencyCategory";
import { DependencyLink } from "./dependencies/DependencyLink";

const style = new Stylist({ color: "gray" });

// red
style.newStyle(DependencyCategory.APPLICATION, {
  style: "normal",
  color: "red4",
  fillcolor: "firebrick1",
});
// blue
style.newStyle(DependencyCategory.CORE, { style: "normal", color: "lightsteelblue1", fillcolor: "lightslateblue" });
// green
style.newStyle(DependencyCategory.LIBRARY, { style: "normal", color: "palegreen", fillcolor: "darkgreen" });
// yellow
style.newStyle(DependencyCategory.STACK, { style: "normal", color: "gold4", fillcolor: "yellow" });
// orange
style.newStyle(DependencyCategory.INTERNAL_STACK, {
  style: "normal",
  color: "orange4",
  fillcolor: "orange",
});
// pink
style.newStyle(DependencyCategory.TYPE, { style: "normal", color: "lightpink", fillcolor: "pink4" });

style.newStyle(DependencyType.EXTERNAL, { style: "dashed" });
style.newStyle(DependencyType.INTERNAL, { style: "filled", color: "black" });

// red
style.newStyle(DependencyLink.DEP, { style: "bold", color: "black" });
// black
style.newStyle(DependencyLink.DEV, { style: "dashed", color: "black" });
// gray
style.newStyle(DependencyLink.PEER, { style: "dashed", color: "gray" });

export class Node {
  private node: graphviz.Node;

  constructor(private graph: graphviz.Graph, private d: Dependency) {
    const styles = style.getStyles(d.category, d.type);

    const name = `${d.name} (v${d.version})`;
    this.node = this.graph.addNode(name, styles);
  }

  build() {
    this.dependency.dependOns.forEach((dep) =>
      this.graph.addEdge(this.node, new Node(this.graph, dep).node, style.getStyle(DependencyLink.DEP)),
    );
    this.dependency.devDependOns.forEach((dep) =>
      this.graph.addEdge(this.node, new Node(this.graph, dep).node, style.getStyle(DependencyLink.DEV)),
    );
    this.dependency.peerDependOns.forEach((dep) =>
      this.graph.addEdge(this.node, new Node(this.graph, dep).node, style.getStyle(DependencyLink.PEER)),
    );
  }

  get graphviz() {
    return this.node;
  }

  get dependency() {
    return this.d;
  }
}
