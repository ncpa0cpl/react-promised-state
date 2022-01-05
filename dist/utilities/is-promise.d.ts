import type { PromisedSetStateAction } from "../state-controller/state-controller.types";
export declare function isPromise<T>(action: PromisedSetStateAction<T>): action is Promise<T>;
