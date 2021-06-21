export interface UseSafelySetResult {
  /**
   * Safely execute state's Set method. If the component has
   * been unmounted setting the state will be omitted.
   */
  safelySet(setter: () => void): void;
}
