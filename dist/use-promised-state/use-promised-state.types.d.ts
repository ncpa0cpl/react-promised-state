import type { PromisedSetStateAction, PromisedState } from "../state-controller/state-controller.types";
export declare type PromisedStateHook<T> = [PromisedState<T>, (action: PromisedSetStateAction<T>) => void];
