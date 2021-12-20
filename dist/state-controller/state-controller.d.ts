import type { PromisedSetStateAction, PromisedState, PromisedStateInitializer } from "./state-controller.types";
export declare class StateController<T = undefined> {
    private data;
    private error?;
    private isPending;
    private onChangeCallback;
    private asyncUpdates;
    private suspenseReader;
    constructor(initialValue?: PromisedStateInitializer<T>);
    private triggerChangeCallback;
    private handleSuccessfulSetStateAction;
    private handleFailedSetStateAction;
    getState(): PromisedState<T>;
    addChangeListener(callback: () => void): void;
    dispatch(action: PromisedSetStateAction<T>): void;
}
