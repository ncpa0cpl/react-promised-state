import execa from "execa";
import readline from "readline";
import chalk from "chalk";

export async function run<T>(promise: Promise<T>) {
  try {
    return {
      error: null,
      data: await promise,
    };
  } catch (e) {
    return { error: e as execa.ExecaError, data: null };
  }
}

export function onError(name: string, v: execa.ExecaError<string>) {
  console.error(`[${chalk.red("✕")}] ${name}\n`);
  console.error(v.stdout, "\n", chalk.red(v.stderr));
  console.info("\n", chalk.redBright("Exiting"));
  throw new Error();
}

export function onSuccess(name: string) {
  console.info(`[${chalk.green("✓")}] ${name}`);
}

export const stdin = (() => {
  return (message: string) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise<string>((resolve) => {
      rl.question(message, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  };
})();
