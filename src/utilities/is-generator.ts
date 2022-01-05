import type {
  PromisedGenerator,
  PromisedSetStateAction,
} from "../state-controller/state-controller.types";

export function isGenerator<T>(action: PromisedSetStateAction<T>): action is PromisedGenerator<T> {
  return typeof action === "function";
}
