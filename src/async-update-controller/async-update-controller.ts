export class AsyncUpdateController<T> {
  private currentToken?: symbol;

  private onResolveCallback = (_: T) => {};
  private onRejectCallback = (_: unknown) => {};
  private onDispatchCallback = () => {};

  cancelLastDispatch() {
    this.currentToken = undefined;
  }

  addResolveListener(callback: (v: T) => void) {
    this.onResolveCallback = callback;
  }

  addRejectListener(callback: (e: unknown) => void) {
    this.onRejectCallback = callback;
  }

  addDispatchListener(callback: () => void) {
    this.onDispatchCallback = callback;
  }

  dispatch(p: Promise<T>) {
    this.onDispatchCallback();

    const token = Symbol();
    this.currentToken = token;

    p.then((v) => {
      if (this.currentToken !== token) return;
      this.onResolveCallback(v);
    }).catch((e) => {
      if (this.currentToken !== token) return;
      this.onRejectCallback(e);
    });
  }
}
