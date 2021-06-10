import type { PromisedResourceProps, PropResources } from "../PromisedResourceComponent";
export declare type PromisedResourceHOCParams = Partial<Pick<PromisedResourceProps<PropResources<unknown>>, "fallback" | "errorComponent">>;
export declare type PromisedResourceHOCResultParams<T> = PromisedResourceHOCParams & Pick<PromisedResourceProps<PropResources<T>>, "component" | "resource">;
