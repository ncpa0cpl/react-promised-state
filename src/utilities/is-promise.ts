import type { PromisedSetStateAction } from "../state-controller/state-controller.types";

export function isPromise<T>(action: PromisedSetStateAction<T>): action is Promise<T> {
  return action instanceof Promise;
}
