import { AsyncUpdateController } from "../async-update-controller/async-update-controller";
import { SuspenseReader } from "../suspense-reader/suspense-reader";
import { isGenerator } from "../utilities/is-generator";
import { isPromise } from "../utilities/is-promise";
import type { PromisedSetStateAction, PromisedState } from "./state-controller.types";

const NULL = Symbol();

export class StateController<T = undefined> {
  private data: T | symbol = NULL;
  private error: unknown = NULL;
  private isPending = true;

  private onChangeCallback = () => {};

  private asyncUpdates = new AsyncUpdateController<T>();
  private suspenseReader = new SuspenseReader<T>();

  constructor() {
    this.asyncUpdates.addResolveListener((v) => this.handleSuccessfulSetStateAction(v));
    this.asyncUpdates.addRejectListener((e) => this.handleFailedSetStateAction(e));
    this.asyncUpdates.addDispatchListener(() => this.suspenseReader.reset());

    this.dispatch = this.dispatch.bind(this);
  }

  private triggerChangeCallback() {
    try {
      this.onChangeCallback();
    } catch (e) {
      //
    }
  }

  private handleSyncSetStateAction(arg: { error: unknown } | { data: T }): void {
    this.asyncUpdates.cancelLastDispatch();
    this.suspenseReader.reset();

    if ("error" in arg) this.handleFailedSetStateAction(arg.error);
    else this.handleSuccessfulSetStateAction(arg.data);
  }

  private handleSuccessfulSetStateAction(v: T): void {
    this.data = v;
    this.error = NULL;
    this.isPending = false;
    this.suspenseReader.success(v);

    this.triggerChangeCallback();
  }

  private handleFailedSetStateAction(e: unknown): void {
    this.data = NULL;
    this.error = e;
    this.isPending = false;
    this.suspenseReader.fail(e);

    this.triggerChangeCallback();
  }

  getState(): PromisedState<T> {
    const self = this;

    return {
      get data() {
        if (self.data === NULL) return null;
        return self.data as T;
      },
      get error() {
        if (self.error === NULL) return null;
        if (self.error instanceof Error) return self.error;
        if (typeof self.error === "string") return new Error(self.error);
        return new Error("Last Set State Action has rejected.");
      },
      get isPending() {
        return self.isPending;
      },
      read() {
        return self.suspenseReader.read();
      },
    };
  }

  addChangeListener(callback: () => void): void {
    this.onChangeCallback = callback;
  }

  dispatch(action: PromisedSetStateAction<T>): void {
    if (isGenerator(action)) {
      try {
        action = action(this.getState());
      } catch (e) {
        this.handleSyncSetStateAction({ error: e });
        return;
      }
    }

    if (isPromise(action)) {
      this.isPending = true;
      this.asyncUpdates.dispatch(action);
      return;
    }

    this.handleSyncSetStateAction({ data: action });
  }
}
