import * as React from "react";
import type { UsePromisedStateResult } from ".";
import type { PromisedStateResource } from "../libs";
import { Resource, unpackPromise, useSafelySet } from "../libs";
import { useSuspensePromise } from "../PromisedSuspense";
import { RestorePreviousState } from "../RestorePreviousState";

export function usePromisedState<T = undefined>(
  initialPromise?: Promise<T>
): UsePromisedStateResult<T> {
  const promise = React.useRef<Promise<T>>();
  const [resource, setResource] = React.useState(Resource.init<T>());
  const { originRef, readerRef, updatePromiseResource } = useSuspensePromise<T>();

  const { safelySet } = useSafelySet();

  const updateState = React.useCallback((res: PromisedStateResource<T>, origin: Promise<T>) => {
    safelySet(() => {
      setResource(res);
      updatePromiseResource(res, origin);
    });
  }, []);

  const setPromise = React.useCallback(async (newPromise: Promise<T>) => {
    const oldResource = resource;
    const oldOrigin = originRef.current;

    updateState(Resource.init(), newPromise);
    promise.current = newPromise;

    const promiseResult = await unpackPromise(newPromise);

    if (newPromise === promise.current) {
      if ("error" in promiseResult) {
        if (RestorePreviousState.isInstance(promiseResult.error)) {
          updateState(oldResource, oldOrigin);
        } else {
          updateState(Resource.failure(promiseResult.error), newPromise);
        }
      } else {
        updateState(Resource.success<T>(promiseResult.data), newPromise);
      }
    }
  }, []);

  React.useEffect(() => {
    if (initialPromise) {
      setPromise(initialPromise);
    }
  }, []);

  const finalResource = React.useMemo(
    () =>
      Object.freeze({
        ...resource,
        read: readerRef.current.read,
      }),
    [resource]
  );

  return [finalResource, setPromise];
}
