import { AsyncUpdateController } from "../../src/async-update-controller/async-update-controller";
import { sleep } from "../helpers";

describe("AsyncUpdateController", () => {
  let controller: AsyncUpdateController<any>;
  let onResolve: jest.Mock<any, any>;
  let onReject: jest.Mock<any, any>;
  let onDispatch: jest.Mock<any, any>;

  beforeEach(() => {
    controller = new AsyncUpdateController();
    onResolve = jest.fn();
    onReject = jest.fn();
    onDispatch = jest.fn();

    controller.addResolveListener(onResolve);
    controller.addRejectListener(onReject);
    controller.addDispatchListener(onDispatch);
  });

  it("should propagate the resolved promises to the correct callback", async () => {
    controller.dispatch(sleep(5).then(() => "foo"));

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(0);

    await sleep(5);

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(1);

    expect(onResolve).toHaveBeenLastCalledWith("foo");
  });

  it("should propagate the rejected promises to the correct callback", async () => {
    controller.dispatch(
      sleep(5).then(() => {
        throw "bar";
      })
    );

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(0);

    await sleep(5);

    expect(onReject).toHaveBeenCalledTimes(1);
    expect(onResolve).toHaveBeenCalledTimes(0);

    expect(onReject).toHaveBeenLastCalledWith("bar");
  });

  it("should invoke dispatch callback on each dispatch", () => {
    expect(onDispatch).toHaveBeenCalledTimes(0);
    controller.dispatch(Promise.resolve());
    expect(onDispatch).toHaveBeenCalledTimes(1);
    controller.dispatch(Promise.resolve());
    expect(onDispatch).toHaveBeenCalledTimes(2);
    controller.dispatch(Promise.resolve());
    expect(onDispatch).toHaveBeenCalledTimes(3);
  });

  it("should cancel the dispatch when `cancelLastDispatch` is called", async () => {
    controller.dispatch(sleep(5).then(() => "foo"));
    controller.cancelLastDispatch();

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(0);

    await sleep(6);

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(0);

    controller.dispatch(
      sleep(5).then(() => {
        throw "bar";
      })
    );
    controller.cancelLastDispatch();

    await sleep(6);

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(0);
  });

  it("should cancel the previous dispatch after a new one", async () => {
    controller.dispatch(sleep(10).then(() => "dispatch-1"));
    controller.dispatch(sleep(5).then(() => "dispatch-2"));

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(0);

    await sleep(16);

    expect(onReject).toHaveBeenCalledTimes(0);
    expect(onResolve).toHaveBeenCalledTimes(1);

    expect(onResolve).toHaveBeenLastCalledWith("dispatch-2");
  });
});
