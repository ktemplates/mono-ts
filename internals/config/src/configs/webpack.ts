import { Configuration, RuleSetRule } from "webpack";
import { ConfigFunction } from "../models/ConfigFn";
import { resolve } from "path";

type Mode = "production" | "development" | "none";

interface Options {
  /**
   * webpack mode production / development / none
   * @default production
   */
  mode?: Mode;
  /**
   * add config to support react
   * @default false
   */
  react?: boolean;
  /**
   * add config to support eslint and prettier
   * @default true
   */
  lint?: boolean;
}

const webpack: ConfigFunction<Options, Configuration> = (_root, _opts) => {
  const root = _root ?? __dirname;
  const option = _opts ?? {};
  const opts = { mode: "production" as Mode, react: false, lint: true, ...option };

  const index = opts.react ? "index.tsx" : "index.ts";
  const rules: RuleSetRule[] = [
    {
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
    },
  ];

  if (opts.lint)
    rules.unshift({
      enforce: "pre",
      test: /\.tsx?$/,
      loader: "eslint-loader",
      exclude: /node_modules/,
      options: {
        cache: true,
      },
    });

  return {
    mode: opts?.mode || "production",
    target: "node",
    entry: {
      index: resolve(root, "src", index),
    },
    devtool: "source-map",
    output: {
      path: resolve(root, "lib"),
      filename: "[name].js",
      library: ["[name]"],
      libraryTarget: "umd",
    },
    module: {
      rules: rules,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", "json"],
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  };
};

export default webpack;
