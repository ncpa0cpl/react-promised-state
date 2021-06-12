import { useRef } from "react";
import type { PromisedStateResource } from "../libs";

export function useSuspensePromise<T>() {
  const resourceRef = useRef<PromisedStateResource<T>>();
  const originRef = useRef(new Promise(() => {}));

  const readerRef = useRef({
    read(): T {
      if (resourceRef.current?.isReady) {
        return resourceRef.current.data;
      } else if (resourceRef.current?.error) {
        throw resourceRef.current.error;
      }
      throw originRef.current;
    },
  });

  const updatePromiseResource = (res: PromisedStateResource<T>, origin: Promise<T>) => {
    resourceRef.current = res;
    originRef.current = origin;
  };

  return {
    readerRef,
    updatePromiseResource,
  };
}
