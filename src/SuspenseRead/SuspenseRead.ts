import type { PromisedStateResource } from "../libs";

export function readPromised<T>(resource: PromisedStateResource<T>) {
  const _res = resource as unknown as { _read(): T };
  return _res._read();
}
