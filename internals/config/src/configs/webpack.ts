import { Configuration } from "webpack";
import { ConfigFunction } from "../models/ConfigFn";
import { resolve } from "path";

interface Options {
  mode?: "production" | "development";
  react?: boolean;
}

const webpack: ConfigFunction<Options, Configuration> = (_root, _opts) => {
  const root = _root ?? __dirname;
  const opts = _opts ?? {};

  const index = opts.react ? "index.tsx" : "index.ts";

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
      rules: [
        {
          enforce: "pre",
          test: /\.tsx?$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            cache: true,
          },
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
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
