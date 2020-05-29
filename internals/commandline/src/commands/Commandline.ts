import { spawn, ChildProcess } from "child_process";
import { Execution } from "../models/Execution";
import { Transformer } from "../models/Transformer";

/**
 * This will get transformer command array and execute
 */
export class Commandline<O> extends Execution<O, string[], ChildProcess> {
  constructor(transformer: Transformer<O, string[]>) {
    super(transformer, ({ data }) => {
      const commands = data.transform;
      const command = commands.shift() ?? "echo";

      console.debug(`[debug] command: ${command} ${commands.join(" ")}`);
      const proc = spawn(command, commands, { stdio: "inherit" });
      proc.on("exit", (code, signal) => {
        console.debug(`[debug] exit code: ${code} (signal=${signal})`);

        const c = code ?? 1;
        if (c > 0) process.exit(c);
      });

      return proc;
    });
  }
}
