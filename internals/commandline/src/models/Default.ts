import { DataTransformer } from "./Data";
import { OptionType } from "./Option";

export const optionTransformer: DataTransformer<OptionType, OptionType> = o => o.data;
