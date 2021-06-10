import type { PromisedStateResource } from ".";

export const Resource = {
  init<T>(): PromisedStateResource<T> {
    return Object.freeze({
      data: null,
      error: null,
      isReady: false,
    });
  },
  success<T>(data: T): PromisedStateResource<T> {
    return Object.freeze({
      data,
      error: null,
      isReady: true,
    });
  },
  failure<T>(error: Error): PromisedStateResource<T> {
    return Object.freeze({
      data: null,
      error,
      isReady: false,
    });
  },
};
