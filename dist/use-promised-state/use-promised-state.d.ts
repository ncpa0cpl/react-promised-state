import type { PromisedStateInitializer } from "../state-controller/state-controller.types";
import type { PromisedStateHook } from "./use-promised-state.types";
export declare const usePromisedState: <T>(initialValue?: PromisedStateInitializer<T> | undefined) => PromisedStateHook<T>;
