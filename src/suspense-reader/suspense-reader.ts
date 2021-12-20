const UNDEFINED = Symbol();

export class SuspenseReader<T> {
  private value: T | symbol = UNDEFINED;
  private error: unknown = UNDEFINED;
  private isPending = true;
  private promise!: Promise<void>;

  private resolve = () => {};
  private reject = (_: unknown) => {};

  constructor() {
    this.reset();
  }

  reset() {
    this.value = UNDEFINED;
    this.error = UNDEFINED;
    this.isPending = true;

    this.promise = new Promise((onSuccess, onFailure) => {
      this.resolve = onSuccess;
      this.reject = onFailure;
    });
  }

  read(): T {
    if (this.isPending) throw this.promise;

    if (this.error !== UNDEFINED) {
      return this.value as T;
    }

    throw this.error;
  }

  update(v: T) {
    this.value = v;
    this.error = UNDEFINED;
    this.isPending = false;
    this.resolve();
  }

  fail(e: unknown) {
    this.value = UNDEFINED;
    this.error = e;
    this.isPending = false;
    this.reject(e);
  }
}
