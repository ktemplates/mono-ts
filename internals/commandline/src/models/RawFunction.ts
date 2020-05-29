import { DataTransformer, Data } from "./Data";
import { CommandHelper } from "./CommandHelper";

export abstract class RawFunction<P, R> {
  private data: Data<P, R>;
  constructor(transformer: DataTransformer<P, R>) {
    this.data = new Data(transformer);
  }

  abstract getData(): Promise<P>;

  abstract getHelper(): CommandHelper;

  async get() {
    const d = await this.getData();
    return this.data.build(this.getHelper(), d);
  }
}
