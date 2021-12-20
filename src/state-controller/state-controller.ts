import { AsyncUpdateController } from "../async-update-controller/async-update-controller";
import { SuspenseReader } from "../suspense-reader/suspense-reader";
import { isGenerator } from "../utilities/is-generator";
import { isPromise } from "../utilities/is-promise";
import type {
  PromisedSetStateAction,
  PromisedState,
  PromisedStateInitializer,
} from "./state-controller.types";

export class StateController<T = undefined> {
  private data: T | null = null;
  private error?: unknown;
  private isPending = true;

  private onChangeCallback = () => {};

  private asyncUpdates = new AsyncUpdateController<T>();
  private suspenseReader = new SuspenseReader<T>();

  constructor(initialValue?: PromisedStateInitializer<T>) {
    this.asyncUpdates.addResolveListener((v) => this.handleSuccessfulSetStateAction(v));
    this.asyncUpdates.addRejectListener((e) => this.handleFailedSetStateAction(e));
    this.asyncUpdates.addDispatchListener(() => this.suspenseReader.reset());

    if (initialValue) {
      this.dispatch(initialValue);
    }

    this.dispatch = this.dispatch.bind(this);
  }

  private triggerChangeCallback() {
    try {
      this.onChangeCallback();
    } catch (e) {
      //
    }
  }

  private handleSuccessfulSetStateAction(v: T): void {
    this.data = v;
    this.error = null;
    this.isPending = false;
    this.suspenseReader.update(v);

    this.triggerChangeCallback();
  }

  private handleFailedSetStateAction(e: unknown): void {
    this.data = null;
    this.error = e;
    this.isPending = false;
    this.suspenseReader.fail(e);

    this.triggerChangeCallback();
  }

  getState(): PromisedState<T> {
    const self = this;

    return {
      get data() {
        return self.data;
      },
      get error() {
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
        const generatorResult = action(this.getState());
        this.dispatch(generatorResult);
      } catch (e) {
        this.asyncUpdates.cancelLastDispatch();
        this.handleFailedSetStateAction(e);
      }
      return;
    }

    if (isPromise(action)) {
      this.asyncUpdates.dispatch(action);
      return;
    }

    this.asyncUpdates.cancelLastDispatch();
    this.handleSuccessfulSetStateAction(action);
  }
}
