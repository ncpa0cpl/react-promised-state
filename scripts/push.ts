import execa from "execa";
import { onError, onSuccess, run, stdin } from "./libs";

async function gitAdd() {
  const name = "Git Add";
  const result = await run(execa("git", ["add", "."]));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function gitCommit() {
  const name = "Git Commit";
  const commitMessage = await stdin("Commit message:\n");

  if (commitMessage.length === 0) {
    console.error("Commit message cannot be empty!");
    throw new Error();
  }

  const result = await run(execa("git", ["commit", "-m", commitMessage]));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function gitPush() {
  const name = "Push";
  const result = await run(execa("git", ["push", "-u", "origin", "HEAD"]));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function build() {
  const name = "Build";
  const result = await run(execa("npm", ["run", "build"]));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function lint() {
  const name = "Lint";
  const result = await run(execa("npm", ["run", "lint"]));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function tsc() {
  const name = "TypeScript";
  const result = await run(execa("npm", ["run", "tsc"]));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function pretty() {
  const name = "Prettier";
  const result = await run(execa("npm", ["run", "pretty:check"]));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function test() {
  const name = "Tests";
  const result = await run(execa('npm', ['run', 'test']));
  if (result.error) {
    return onError(name, result.error);
  }
  return onSuccess(name);
}

async function main() {
  try {
    await lint();
    await tsc();
    await pretty();
    // await test();
    await build();
    await gitAdd();
    await gitCommit();
    await gitPush();
  } catch (e) {}

  return true;
}

main();
