import { DataTransformer } from "./Data";
import { Transformer } from "./Transformer";
import { RawFunction } from "./RawFunction";
import { Command } from "./Command";

export interface ExecutionOption<O, T> {
  option: O;
  transform: T;
}

export class Execution<O, T, R> extends RawFunction<ExecutionOption<O, T>, R> implements Command<R> {
  constructor(private transform: Transformer<O, T>, transformer: DataTransformer<ExecutionOption<O, T>, R>) {
    super(transformer);
  }

  async getData() {
    const option = await this.transform.getData();
    const transform = await this.transform.get();

    return { option, transform };
  }

  getHelper() {
    return this.transform.getHelper();
  }

  start() {
    return this.get();
  }
}
