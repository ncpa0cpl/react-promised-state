import type { PromisedStateResource } from ".";
export declare const Resource: {
    init<T>(): PromisedStateResource<T>;
    success<T_1>(data: T_1): PromisedStateResource<T_1>;
    failure<T_2>(error: Error): PromisedStateResource<T_2>;
};
