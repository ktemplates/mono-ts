import { CommandHelper } from "./CommandHelper";

export interface DataOption<P> {
  helper: CommandHelper;
  data: P;
}

export type DataTransformer<P, R> = (p: DataOption<P>) => R | Promise<R>;

export class Data<P, R> {
  constructor(private transformer: DataTransformer<P, R>) {}

  build(helper: CommandHelper, p: P) {
    return this.transformer({
      helper,
      data: p,
    });
  }
}
