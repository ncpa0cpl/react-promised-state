import type { UnpackedPromise } from ".";

export async function unpackPromise<T>(promise: Promise<T>): Promise<UnpackedPromise<T>> {
  try {
    return { data: await promise };
  } catch (e) {
    if (!(e instanceof Error)) {
      if (typeof e === "string") {
        return {
          error: new Error(e),
        };
      } else {
        return {
          error: new Error("An error occured during resolving a promise."),
        };
      }
    }
    return { error: e };
  }
}
