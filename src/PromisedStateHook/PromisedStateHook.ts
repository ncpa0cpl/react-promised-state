import * as React from "react";
import type { UsePromisedStateResult } from ".";
import type { PromisedStateResource } from "../libs";
import { Resource, unpackPromise } from "../libs";
import { useSuspensePromise } from "../PromisedSuspense";

export function usePromisedState<T = undefined>(
  initialPromise?: Promise<T>
): UsePromisedStateResult<T> {
  const promise = React.useRef<Promise<T>>();
  const [resource, setResource] = React.useState(Resource.init<T>());
  const { readerRef, updatePromiseResource } = useSuspensePromise<T>();

  const updateState = (res: PromisedStateResource<T>, origin: Promise<T>) => {
    setResource(res);
    updatePromiseResource(res, origin);
  };

  const setPromise = async (newPromise: Promise<T>) => {
    updateState(Resource.init(), newPromise);
    promise.current = newPromise;

    const promiseResult = await unpackPromise(newPromise);

    if (newPromise === promise.current) {
      if ("error" in promiseResult) {
        updateState(Resource.failure(promiseResult.error), newPromise);
      } else {
        updateState(Resource.success<T>(promiseResult.data), newPromise);
      }
    }
  };

  React.useEffect(() => {
    if (initialPromise) {
      setPromise(initialPromise);
    }
  }, []);

  const finalResource = Object.freeze({
    ...resource,
    read() {
      return readerRef.current.read();
    },
  });

  return [finalResource, setPromise];
}
