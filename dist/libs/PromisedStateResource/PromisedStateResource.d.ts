import type { FailedPromisedStateResource, PromisedStateResource } from ".";
export declare const Resource: {
    init<T>(): PromisedStateResource<T>;
    success<T_1>(data: T_1): PromisedStateResource<T_1>;
    failure(error: Error): FailedPromisedStateResource;
};
