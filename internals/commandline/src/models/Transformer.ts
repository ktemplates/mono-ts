import { DataTransformer } from "./Data";
import { Option } from "./Option";
import { RawFunction } from "./RawFunction";

export class Transformer<O, T> extends RawFunction<O, T> {
  constructor(private option: Option<O>, transformer: DataTransformer<O, T>) {
    super(transformer);
  }

  getOption() {
    return this.option;
  }

  getHelper() {
    return this.option.getHelper();
  }

  getData() {
    return this.option.get();
  }
}
