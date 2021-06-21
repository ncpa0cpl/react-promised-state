import * as React from "react";
import type { UseSafelySetResult } from ".";

/**
 * Provides a method for safely updating components state asynchronously.
 * This hook tracks the state of the component and prevents the setter method
 * passed to the `safeSet` from executing if the component is no longer mounted.
 */
export const useSafelySet = (): UseSafelySetResult => {
  const isMounted = React.useRef(true);

  const safelySet = React.useCallback((setter: () => void) => {
    if (isMounted.current === true) {
      setter();
    }
  }, []);

  React.useEffect(() => () => {
    isMounted.current = false;
  });

  return {
    safelySet,
  };
};
