import type { FailedPromisedStateResource, PromisedStateResource } from ".";
export declare const Resource: {
    init<T>(origin?: Promise<T> | undefined): PromisedStateResource<T>;
    success<T_1>(data: T_1, origin: Promise<T_1>): PromisedStateResource<T_1>;
    failure<T_2>(error: Error, origin: Promise<T_2>): FailedPromisedStateResource;
};
