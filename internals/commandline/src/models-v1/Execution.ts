export interface Execution<I, R, O = any> {
  run(input: I, options?: O): R;
}
