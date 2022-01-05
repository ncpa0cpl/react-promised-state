import type {
  PromisedSetStateAction,
  PromisedState,
} from "../state-controller/state-controller.types";

export type PromisedStateHook<T> = [PromisedState<T>, (action: PromisedSetStateAction<T>) => void];
