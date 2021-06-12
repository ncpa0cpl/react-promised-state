import type { PromisedStateResource } from "../libs";

export interface SuspenseReader<T> {
  /**
   * Read the value when within `React.Suspense` boundary.
   *
   * DO NOT USE OUTSIDE Suspense boundary! This will lead to errors in your app!
   *
   * If you want to use this state's value outside suspense boundary use the `data`
   * property when the `isReady` flag is true.
   */
  read(): T;
}

export type PromisedStateSetter<T> = (newPromise: Promise<T>) => Promise<void>;

export type UsePromisedStateResult<T> = readonly [
  Readonly<SuspenseReader<T>> & PromisedStateResource<T>,
  PromisedStateSetter<T>
];
