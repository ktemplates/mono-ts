import { Execution } from "./Execution";

type Func<T, R> = (opts?: T) => R;

export class Method<O, R> implements Execution<Func<O, R>, R, O> {
  run(fn: Func<O, R>, o?: O) {
    return fn(o);
  }
}
