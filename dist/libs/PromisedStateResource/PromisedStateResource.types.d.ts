export declare type SuccessfullPromisedStateResource<T> = {
    readonly data: T;
    readonly isReady: true;
    readonly error: null;
};
export declare type FailedPromisedStateResource = {
    readonly data: null;
    readonly isReady: false;
    readonly error: null | Error;
};
export declare type PromisedStateResource<T> = SuccessfullPromisedStateResource<T> | FailedPromisedStateResource;
