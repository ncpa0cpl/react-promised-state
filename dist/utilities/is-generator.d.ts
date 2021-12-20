import type { PromisedGenerator, PromisedSetStateAction } from "../state-controller/state-controller.types";
export declare function isGenerator<T>(action: PromisedSetStateAction<T>): action is PromisedGenerator<T>;
