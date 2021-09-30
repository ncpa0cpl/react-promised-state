export class RestorePreviousState extends Error {
  static isInstance(e: Error | RestorePreviousState): e is RestorePreviousState {
    return "_isRestorePreviousState" in e ? e._isRestorePreviousState : false;
  }

  private readonly _isRestorePreviousState = true;
}
