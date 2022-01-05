import React from "react";
import { StateController } from "../state-controller/state-controller";
import type { PromisedStateInitializer } from "../state-controller/state-controller.types";
import type { PromisedStateHook } from "./use-promised-state.types";

const forceRenderReducer = (i: number) => i + 1;

export const usePromisedState = <T>(
  initialValue?: PromisedStateInitializer<T>
): PromisedStateHook<T> => {
  const [_, forceRender] = React.useReducer(forceRenderReducer, 0);

  const [state] = React.useState(() => {
    const s = new StateController<T>();
    if (initialValue) s.dispatch(initialValue);
    s.addChangeListener(() => forceRender());
    return s;
  });

  return [state.getState(), state.dispatch];
};
