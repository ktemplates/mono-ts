import { Execution } from "./Execution";

type Result = void | Promise<void>;
type Func<T> = (opts?: T) => Result;

export class Method<O> implements Execution<Func<O>, Result, O> {
  run(fn: Func<O>, o?: O) {
    return fn(o);
  }
}
