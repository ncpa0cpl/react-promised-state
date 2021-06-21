import type { UseSafelySetResult } from ".";
/**
 * Provides a method for safely updating components state asynchronously.
 * This hook tracks the state of the component and prevents the setter method
 * passed to the `safeSet` from executing if the component is no longer mounted.
 */
export declare const useSafelySet: () => UseSafelySetResult;
