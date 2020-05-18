import { ConfigFunction } from "../models/ConfigFn";

interface PrettierConfig {
  semi: boolean;
  trailingComma: "all" | "es5";
  singleQuote: boolean;
  printWidth: number;
  tabWidth: number;
  useTabs: boolean;
  bracketSpacing: boolean;
  arrowParens: "avoid" | "always";
  endOfLine: "lf" | "crlf" | "cr" | "auto";
}

const prettier: ConfigFunction<void, PrettierConfig> = _root => {
  return {
    semi: true,
    trailingComma: "es5",
    singleQuote: false,
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: "avoid",
    endOfLine: "lf",
  };
};

export default prettier;
