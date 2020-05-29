import { Command } from "../models/Command";
import { RawFunction } from "../models/RawFunction";

export class Runner<P, R> implements Command<R> {
  constructor(private func: RawFunction<P, R>) {}

  start() {
    return this.func.get();
  }
}
