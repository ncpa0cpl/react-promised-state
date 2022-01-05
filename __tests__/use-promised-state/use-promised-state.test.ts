import { renderHook } from "react-hooks-testing-library";
import { usePromisedState } from "../../src/use-promised-state/use-promised-state";
import { sleep } from "../helpers";

describe("usePromisedState", () => {
  it("should correctly cause react component to update", async () => {
    const hook = renderHook(() => {
      const [state, setState] = usePromisedState();
      return {
        state: { ...state },
        setState,
      };
    });

    let currentState = hook.result.current.state;

    expect(currentState.data).toEqual(null);
    expect(currentState.error).toEqual(null);
    expect(currentState.isPending).toEqual(true);

    hook.result.current.setState("foo");

    currentState = hook.result.current.state;

    expect(currentState.data).toEqual("foo");
    expect(currentState.error).toEqual(null);
    expect(currentState.isPending).toEqual(false);

    hook.result.current.setState(() => "bar");

    currentState = hook.result.current.state;

    expect(currentState.data).toEqual("bar");
    expect(currentState.error).toEqual(null);
    expect(currentState.isPending).toEqual(false);

    hook.result.current.setState(sleep(0).then(() => "baz"));

    currentState = hook.result.current.state;

    expect(currentState.data).toEqual("bar");
    expect(currentState.error).toEqual(null);
    expect(currentState.isPending).toEqual(true);

    await sleep(1);

    currentState = hook.result.current.state;

    expect(currentState.data).toEqual("baz");
    expect(currentState.error).toEqual(null);
    expect(currentState.isPending).toEqual(false);
  });
});
