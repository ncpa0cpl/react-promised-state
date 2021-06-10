import type React from "react";
import type { PromisedStateResource } from "../libs";
declare type LastOfTuple<T extends ReadonlyArray<PromisedStateResource<unknown>>> = T extends readonly [
    ...infer _,
    infer L
] ? L : never;
declare type TrimTuple<T extends ReadonlyArray<PromisedStateResource<unknown>>> = T extends readonly [
    ...infer Rest,
    infer _
] ? readonly [...Rest] : never;
declare type GetPromisedStateResourceType<R> = R extends PromisedStateResource<infer T> ? T : never;
declare type UnpackResourceTuple<R extends ReadonlyArray<any>, Acc extends Array<any> = []> = R["length"] extends 0 ? Acc : UnpackResourceTuple<TrimTuple<R>, [GetPromisedStateResourceType<LastOfTuple<R>>, ...Acc]>;
export declare type PropResources<T> = PromisedStateResource<T> | ReadonlyArray<PromisedStateResource<T>>;
export declare type UnpackResource<R extends PropResources<unknown>> = R extends ReadonlyArray<PromisedStateResource<unknown>> ? UnpackResourceTuple<R> : R extends PromisedStateResource<infer L> ? L : never;
export interface PromisedResourceProps<R extends PropResources<unknown>> {
    resource: R;
    component: React.ComponentType<{
        resource: UnpackResource<R>;
    }>;
    fallback?: React.ComponentType;
    errorComponent?: React.ComponentType<{
        error: Error;
    }>;
}
export {};
