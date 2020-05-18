import * as childProcess from "child_process";

import { Execution } from "./Execution";

export class Commandline implements Execution<string[], childProcess.ChildProcess, string[]> {
  run(commands?: string[], opts?: string[]) {
    const _opts = opts ?? [];
    const _commands = commands ?? [];

    _commands.push(..._opts);
    const command = _commands.shift() ?? "exit";

    console.debug(`[debug] cmd: ${command} ${_commands.join(" ")}`);
    return childProcess.spawn(command, _commands, { stdio: "inherit" });
  }
}
