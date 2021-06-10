import React from "react";
import type { PromisedResourceHOCParams, PromisedResourceHOCResultParams } from ".";
import { PromisedResource } from "../PromisedResourceComponent";

export function withPromisedResource(params: PromisedResourceHOCParams) {
  return function <T>(props: PromisedResourceHOCResultParams<T>) {
    return (
      <PromisedResource
        resource={props.resource}
        component={props.component}
        fallback={props.fallback ?? params.fallback}
        errorComponent={props.errorComponent ?? params.errorComponent}
      />
    );
  };
}
