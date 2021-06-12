import type { FailedPromisedStateResource, PromisedStateResource } from ".";

export const Resource = {
  init<T>(): PromisedStateResource<T> {
    return {
      data: null,
      error: null,
      isReady: false,
    };
  },
  success<T>(data: T): PromisedStateResource<T> {
    return {
      data,
      error: null,
      isReady: true,
    };
  },
  failure(error: Error): FailedPromisedStateResource {
    return {
      data: null,
      error,
      isReady: false,
    };
  },
};
