import { Configuration, RuleSetRule, ProvidePlugin, Plugin, ExternalsElement } from "webpack";
import { ConfigFunction } from "../models/ConfigFn";
import { resolve, join, basename } from "path";

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

  /**
   * custom library name
   * @default <folder_name> this will get data from package name
   */
  output?: string;
}

const webpack: ConfigFunction<Options, Configuration> = (_root, _opts) => {
  const root = _root ?? __dirname;
  const base = basename(root);

  const option = _opts ?? {};
  const opts = { mode: "production" as Mode, react: false, lint: true, output: base, ...option };

  const index = opts.react ? "index.tsx" : "index.ts";
  const rules: RuleSetRule[] = [
    {
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
    },
  ];

  const plugins: Plugin[] = [];
  const externals: ExternalsElement[] = [];

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

  if (opts.react) {
    plugins.push(
      new ProvidePlugin({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        React: "React",
        react: "React",
        "window.react": "React",
        "window.React": "React",
      })
    );

    externals.push({
      react: {
        root: "React",
        umd: "React",
        commonjs: "react",
        commonjs2: "react",
      },
      "prop-types": {
        root: "PropTypes",
        umd: "PropTypes",
        commonjs: "prop-types",
        commonjs2: "prop-types",
      },
      "react-dom": {
        root: "ReactDOM",
        umd: "ReactDOM",
        commonjs: "react-dom",
        commonjs2: "react-dom",
      },
      "react-dom/server": {
        root: "ReactDOMServer",
        umd: "ReactDOMServer",
        commonjs: "react-dom/server",
        commonjs2: "react-dom/server",
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
      library: opts.output,
      libraryTarget: "umd",
    },
    module: {
      rules: rules,
      noParse: [/react/, /prop-types/],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", "json"],
    },
    plugins: plugins,
    externals: externals,
  };
};

export default webpack;
