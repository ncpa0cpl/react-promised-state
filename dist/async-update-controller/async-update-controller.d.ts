export declare class AsyncUpdateController<T> {
    private currentToken?;
    private onResolveCallback;
    private onRejectCallback;
    private onDispatchCallback;
    cancelLastDispatch(): void;
    addResolveListener(callback: (v: T) => void): void;
    addRejectListener(callback: (e: unknown) => void): void;
    addDispatchListener(callback: () => void): void;
    dispatch(p: Promise<T>): void;
}
