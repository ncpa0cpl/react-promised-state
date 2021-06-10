import React from "react";
import type { PromisedResourceProps, PropResources } from ".";
import { EmptyComponent } from "../libs";
import type { PromisedStateResource } from "../libs";

function isPromisedStateResourceArray<T>(p: unknown): p is PromisedStateResource<T>[] {
  return Array.isArray(p);
}

export function PromisedResource<R extends PropResources<unknown>>(
  props: PromisedResourceProps<R>
) {
  const {
    resource,
    component,
    errorComponent: ErrorComponent = EmptyComponent,
    fallback: Fallback = EmptyComponent,
  } = props;

  const Component = component as any as React.ComponentType<{
    resource: any;
  }>;

  if (isPromisedStateResourceArray(resource)) {
    const err = resource.find((r) => r.error)?.error;
    if (err) {
      return <ErrorComponent error={err} />;
    }
    if (resource.every((r) => r.isReady)) {
      const unpackedResourceData = resource.map((r) => r.data);
      return <Component resource={unpackedResourceData} />;
    }
  } else {
    const _resource = resource as PromisedStateResource<any>;
    if (_resource.error) {
      return <ErrorComponent error={_resource.error} />;
    }
    if (_resource.isReady) {
      return <Component resource={_resource.data} />;
    }
  }
  return <Fallback />;
}
