import type { PromisedResourceProps, PropResources } from "../PromisedResourceComponent";

export type PromisedResourceHOCParams = Partial<
  Pick<PromisedResourceProps<PropResources<unknown>>, "fallback" | "errorComponent">
>;

export type PromisedResourceHOCResultParams<T> = PromisedResourceHOCParams &
  Pick<PromisedResourceProps<PropResources<T>>, "component" | "resource">;
