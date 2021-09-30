import type { UnpackedPromise } from ".";

export async function unpackPromise<T>(promise: Promise<T>): Promise<UnpackedPromise<T>> {
  return new Promise<UnpackedPromise<T>>(async (resolve) => {
    promise
      .then((data) => {
        resolve({ data });
      })
      .catch((e) => {
        if (!(e instanceof Error)) {
          if (typeof e === "string") {
            resolve({
              error: new Error(e),
            });
          } else {
            resolve({
              error: new Error("usePromisedState Error: An error occurred within a promise."),
            });
          }
        }

        resolve({ error: e });
      });
  });
}
