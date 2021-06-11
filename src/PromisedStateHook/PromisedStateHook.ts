import * as React from "react";
import { Resource, unpackPromise } from "../libs";

export function usePromisedState<T = undefined>(initialPromise?: Promise<T>) {
  const promise = React.useRef<Promise<T>>();
  const [resource, setResource] = React.useState(Resource.init<T>());

  const setPromise = async (newPromise: Promise<T>) => {
    setResource(Resource.init(newPromise));
    promise.current = newPromise;

    const promiseResult = await unpackPromise(newPromise);

    if (newPromise === promise.current) {
      if ("error" in promiseResult) {
        setResource(Resource.failure<T>(promiseResult.error, newPromise));
      } else {
        setResource(Resource.success<T>(promiseResult.data, newPromise));
      }
    }
  };

  React.useEffect(() => {
    if (initialPromise) {
      setPromise(initialPromise);
    }
  }, []);

  return [resource, setPromise] as const;
}
