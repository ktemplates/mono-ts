import { Configuration, RuleSetRule } from "webpack";
import { ConfigFunction } from "../models/ConfigFn";
import { resolve, join } from "path";

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

  /**
   * custom index file to run
   * @default index.ts and index.tsx for react
   */
  index?: string;
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

  if (opts.lint) {
    const eslint = join(root, ".eslintrc.js");
    const report = join(root, "eslint.xml");

    rules.unshift({
      enforce: "pre",
      test: /\.tsx?$/,
      loader: "eslint-loader",
      exclude: /node_modules/,
      options: {
        failOnError: true,
        cache: true,
        configFile: eslint,
        outputReport: {
          filePath: report,
        },
      },
    });
  }

  return {
    mode: opts.mode || "production",
    target: "node",
    entry: {
      index: resolve(root, "src", opts.index ?? index),
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
