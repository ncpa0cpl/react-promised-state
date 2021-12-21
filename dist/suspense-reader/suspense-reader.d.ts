export declare class SuspenseReader<T> {
    private value;
    private error;
    private isPending;
    private promise;
    private resolve;
    private reject;
    constructor();
    reset(): void;
    read(): T;
    success(v: T): void;
    fail(e: unknown): void;
}
