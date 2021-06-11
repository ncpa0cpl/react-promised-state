import type { FailedPromisedStateResource, PromisedStateResource } from ".";

function createBaseResoure<T extends PromisedStateResource<unknown>>(
  resourceData: T,
  origin: Promise<unknown>
): T {
  return Object.freeze({
    ...resourceData,
    _read() {
      if (resourceData.isReady) {
        return resourceData.data;
      }
      if (resourceData.error) {
        throw resourceData.error;
      }
      throw origin;
    },
  }) as unknown as T;
}

export const Resource = {
  init<T>(origin?: Promise<T>): PromisedStateResource<T> {
    return createBaseResoure(
      {
        data: null,
        error: null,
        isReady: false,
      },
      origin ?? new Promise(() => {})
    );
  },
  success<T>(data: T, origin: Promise<T>): PromisedStateResource<T> {
    return createBaseResoure(
      {
        data,
        error: null,
        isReady: true,
      },
      origin
    );
  },
  failure<T>(error: Error, origin: Promise<T>): FailedPromisedStateResource {
    return createBaseResoure(
      {
        data: null,
        error,
        isReady: false,
      },
      origin
    );
  },
};
