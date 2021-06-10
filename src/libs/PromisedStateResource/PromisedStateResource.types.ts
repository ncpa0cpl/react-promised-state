export type SuccessfullPromisedStateResource<T> = {
  readonly data: T;
  readonly isReady: true;
  readonly error: null;
};

export type FailedPromisedStateResource = {
  readonly data: null;
  readonly isReady: false;
  readonly error: null | Error;
};

export type PromisedStateResource<T> =
  | SuccessfullPromisedStateResource<T>
  | FailedPromisedStateResource;
