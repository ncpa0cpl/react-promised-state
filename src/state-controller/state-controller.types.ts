export type PromisedState<T> = {
  /** State data, null if no initial value is provided or the initial Promise is still pending. */
  readonly data: T | null;
  /** Error returned by the last provided promise. */
  readonly error: Error | null;
  /** True when the last provided promise is pending, false if it's resolved or rejected. */
  readonly isPending: boolean;
  /** Returns the current state data or throws if it's not ready. Can be used with the React.Suspense. */
  read(): T;
};
export type PromisedGenerator<T> = (currentValue: Omit<PromisedState<T>, "read">) => T | Promise<T>;
export type PromisedStateInitializer<T> = T | (() => T | Promise<T>);
export type PromisedSetStateAction<T> = T | Promise<T> | PromisedGenerator<T>;
