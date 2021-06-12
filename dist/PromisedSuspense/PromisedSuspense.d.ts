/// <reference types="react" />
import type { PromisedStateResource } from "../libs";
export declare function useSuspensePromise<T>(): {
    readerRef: import("react").MutableRefObject<{
        read(): T;
    }>;
    updatePromiseResource: (res: PromisedStateResource<T>, origin: Promise<T>) => void;
};
