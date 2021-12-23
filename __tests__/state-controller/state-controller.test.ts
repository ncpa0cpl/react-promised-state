import { StateController } from "../../src/state-controller/state-controller";
import type { PromisedState } from "../../src/state-controller/state-controller.types";
import { SuspenseReader } from "../../src/suspense-reader/suspense-reader";
import { Catch, isPending, sleep } from "../helpers";

const resetImpl = SuspenseReader.prototype.reset;
const resetSpy = jest.spyOn(SuspenseReader.prototype, "reset");
resetSpy.mockImplementation(function (this: SuspenseReader<any>) {
  resetImpl.bind(this)();
  this["promise"].catch(() => {});
});

describe("StateController", () => {
  let controller: StateController<any>;
  let state: PromisedState<any>;
  let onChange: jest.Mock<any, any>;

  beforeEach(() => {
    controller = new StateController();
    state = controller.getState();
    onChange = jest.fn(() => {});

    controller.addChangeListener(onChange);
  });

  describe("non-async and non-generator dispatch", () => {
    it("should correctly set the value of the controller state", () => {
      expect(state.data).toEqual(null);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      controller.dispatch("foo");

      expect(state.data).toEqual("foo");
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);

      controller.dispatch(Error("bar"));

      expect(state.data).toMatchObject(Error("bar"));
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);
    });

    it("should correctly update the suspense reader", async () => {
      const readValue = Catch(() => state.read());
      expect(readValue).toBeInstanceOf(Promise);
      expect(await isPending(readValue!)).toEqual(true);

      controller.dispatch("baz");

      expect(state.read()).toEqual("baz");

      expect(await isPending(readValue!)).toEqual(false);

      controller.dispatch("qux");

      expect(state.read()).toEqual("qux");
    });

    it("should correctly trigger the onChange callback", () => {
      expect(onChange).toHaveBeenCalledTimes(0);
      controller.dispatch("FOO");
      expect(onChange).toHaveBeenCalledTimes(1);
      controller.dispatch("BAR");
      expect(onChange).toHaveBeenCalledTimes(2);
      controller.dispatch("BAZ");
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it("should cancel previous async set state actions", async () => {
      controller.dispatch(sleep(5).then(() => "async"));

      expect(state.isPending).toEqual(true);

      controller.dispatch("sync");

      expect(state.data).toEqual("sync");
      expect(state.isPending).toEqual(false);

      await sleep(7);

      expect(state.data).toEqual("sync");
      expect(state.isPending).toEqual(false);
    });
  });

  describe("non-async generator dispatch", () => {
    it("should correctly set the value of the controller state", () => {
      expect(state.data).toEqual(null);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      controller.dispatch(() => "foo");

      expect(state.data).toEqual("foo");
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);

      controller.dispatch(() => Error("bar"));

      expect(state.data).toMatchObject(Error("bar"));
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);

      const callback = () => {};

      controller.dispatch(() => callback);

      expect(state.data).toEqual(callback);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);
    });

    it("should correctly update the suspense reader", async () => {
      const readValue = Catch(() => state.read());
      expect(readValue).toBeInstanceOf(Promise);
      expect(await isPending(readValue!)).toEqual(true);

      controller.dispatch(() => "baz");

      expect(state.read()).toEqual("baz");

      expect(await isPending(readValue!)).toEqual(false);

      controller.dispatch(() => "qux");

      expect(state.read()).toEqual("qux");
    });

    it("should correctly trigger the onChange callback", () => {
      expect(onChange).toHaveBeenCalledTimes(0);
      controller.dispatch(() => "FOO");
      expect(onChange).toHaveBeenCalledTimes(1);
      controller.dispatch(() => "BAR");
      expect(onChange).toHaveBeenCalledTimes(2);
      controller.dispatch(() => "BAZ");
      expect(onChange).toHaveBeenCalledTimes(3);
      controller.dispatch(() => {
        throw new Error("error");
      });
      expect(onChange).toHaveBeenCalledTimes(4);
    });

    it("should correctly handle errors thrown in the generator", async () => {
      const readPromise = Catch(() => state.read());

      controller.dispatch(() => {
        throw new Error("error: foo");
      });

      expect(state.data).toEqual(null);
      expect(state.isPending).toEqual(false);
      expect(state.error).toMatchObject(new Error("error: foo"));
      expect(() => state.read()).toThrowError(new Error("error: foo"));
      expect(readPromise).rejects.toMatchObject(new Error("error: foo"));
    });

    it("should cancel previous async set state actions", async () => {
      controller.dispatch(sleep(5).then(() => "async"));

      expect(state.isPending).toEqual(true);

      controller.dispatch(() => "sync");

      expect(state.data).toEqual("sync");
      expect(state.isPending).toEqual(false);

      await sleep(7);

      expect(state.data).toEqual("sync");
      expect(state.isPending).toEqual(false);
    });
  });

  describe("async non-generators", () => {
    it("should correctly set the value of the controller state", async () => {
      expect(state.data).toEqual(null);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      controller.dispatch(sleep(1).then(() => "FOO-1"));

      expect(state.data).toEqual(null);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toEqual("FOO-1");
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);

      controller.dispatch(sleep(1).then(() => Error("BAR-1")));

      expect(state.data).toEqual("FOO-1");
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toMatchObject(Error("BAR-1"));
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);

      const callback = () => {};

      controller.dispatch(sleep(1).then(() => callback));

      expect(state.data).toMatchObject(Error("BAR-1"));
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toEqual(callback);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);
    });

    it("should correctly update the suspense reader", async () => {
      let readValue = Catch(() => state.read());
      expect(readValue).toBeInstanceOf(Promise);
      expect(await isPending(readValue!)).toEqual(true);

      controller.dispatch(sleep(1).then(() => "baz"));

      await sleep(2);

      expect(state.read()).toEqual("baz");
      expect(await isPending(readValue!)).toEqual(false);

      controller.dispatch(sleep(5).then(() => "qux"));

      readValue = Catch(() => state.read());
      expect(readValue).toBeInstanceOf(Promise);
      expect(await isPending(readValue!)).toEqual(true);

      await sleep(6);

      expect(state.read()).toEqual("qux");
      expect(await isPending(readValue!)).toEqual(false);
    });

    it("should correctly trigger the onChange callback", async () => {
      expect(onChange).toHaveBeenCalledTimes(0);
      controller.dispatch(sleep(1).then(() => "FOO"));
      expect(onChange).toHaveBeenCalledTimes(1);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(2);
      controller.dispatch(sleep(1).then(() => "BAR"));
      expect(onChange).toHaveBeenCalledTimes(3);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(4);
      controller.dispatch(sleep(1).then(() => "BAZ"));
      expect(onChange).toHaveBeenCalledTimes(5);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(6);
      controller.dispatch(
        sleep(1).then(() => {
          throw new Error("error");
        })
      );
      expect(onChange).toHaveBeenCalledTimes(7);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(8);
    });

    it("should correctly handle rejected error", async () => {
      controller.dispatch("coorg");

      expect(state.data).toEqual("coorg");
      expect(state.isPending).toEqual(false);
      expect(state.error).toEqual(null);
      expect(state.read()).toEqual("coorg");

      controller.dispatch(
        sleep(5).then(() => {
          throw new Error("error: bar");
        })
      );

      const readPromise = Catch(() => state.read());

      expect(state.data).toEqual("coorg");
      expect(state.isPending).toEqual(true);
      expect(state.error).toEqual(null);
      expect(readPromise).toBeInstanceOf(Promise);
      expect(await isPending(readPromise!)).toEqual(true);

      await sleep(6);

      expect(state.data).toEqual(null);
      expect(state.isPending).toEqual(false);
      expect(state.error).toMatchObject(new Error("error: bar"));
      expect(() => state.read()).toThrowError(new Error("error: bar"));
      expect(readPromise).rejects.toMatchObject(new Error("error: bar"));
    });

    it("should cancel previous async set state actions", async () => {
      controller.dispatch(sleep(10).then(() => "async"));

      expect(state.isPending).toEqual(true);

      controller.dispatch(sleep(1).then(() => "async-2"));

      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toEqual("async-2");
      expect(state.isPending).toEqual(false);

      await sleep(12);

      expect(state.data).toEqual("async-2");
      expect(state.isPending).toEqual(false);
    });
  });

  describe("async generators", () => {
    it("should correctly set the value of the controller state", async () => {
      expect(state.data).toEqual(null);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      controller.dispatch(() => sleep(1).then(() => "FOO-1"));

      expect(state.data).toEqual(null);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toEqual("FOO-1");
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);

      controller.dispatch(() => sleep(1).then(() => Error("BAR-1")));

      expect(state.data).toEqual("FOO-1");
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toMatchObject(Error("BAR-1"));
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);

      const callback = () => {};

      controller.dispatch(() => sleep(1).then(() => callback));

      expect(state.data).toMatchObject(Error("BAR-1"));
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toEqual(callback);
      expect(state.error).toEqual(null);
      expect(state.isPending).toEqual(false);
    });

    it("should correctly update the suspense reader", async () => {
      let readValue = Catch(() => state.read());
      expect(readValue).toBeInstanceOf(Promise);
      expect(await isPending(readValue!)).toEqual(true);

      controller.dispatch(() => sleep(1).then(() => "baz"));

      await sleep(2);

      expect(state.read()).toEqual("baz");
      expect(await isPending(readValue!)).toEqual(false);

      controller.dispatch(() => sleep(5).then(() => "qux"));

      readValue = Catch(() => state.read());
      expect(readValue).toBeInstanceOf(Promise);
      expect(await isPending(readValue!)).toEqual(true);

      await sleep(6);

      expect(state.read()).toEqual("qux");
      expect(await isPending(readValue!)).toEqual(false);
    });

    it("should correctly trigger the onChange callback", async () => {
      expect(onChange).toHaveBeenCalledTimes(0);
      controller.dispatch(() => sleep(1).then(() => "FOO"));
      expect(onChange).toHaveBeenCalledTimes(1);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(2);
      controller.dispatch(() => sleep(1).then(() => "BAR"));
      expect(onChange).toHaveBeenCalledTimes(3);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(4);
      controller.dispatch(() => sleep(1).then(() => "BAZ"));
      expect(onChange).toHaveBeenCalledTimes(5);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(6);
      controller.dispatch(() =>
        sleep(1).then(() => {
          throw new Error("error");
        })
      );
      expect(onChange).toHaveBeenCalledTimes(7);
      await sleep(2);
      expect(onChange).toHaveBeenCalledTimes(8);
    });

    it("should correctly handle rejected error", async () => {
      controller.dispatch(() => "coorg");

      expect(state.data).toEqual("coorg");
      expect(state.isPending).toEqual(false);
      expect(state.error).toEqual(null);
      expect(state.read()).toEqual("coorg");

      controller.dispatch(() =>
        sleep(5).then(() => {
          throw new Error("error: bar");
        })
      );

      const readPromise = Catch(() => state.read());

      expect(state.data).toEqual("coorg");
      expect(state.isPending).toEqual(true);
      expect(state.error).toEqual(null);
      expect(readPromise).toBeInstanceOf(Promise);
      expect(await isPending(readPromise!)).toEqual(true);

      await sleep(6);

      expect(state.data).toEqual(null);
      expect(state.isPending).toEqual(false);
      expect(state.error).toMatchObject(new Error("error: bar"));
      expect(() => state.read()).toThrowError(new Error("error: bar"));
      expect(readPromise).rejects.toMatchObject(new Error("error: bar"));
    });

    it("should cancel previous async set state actions", async () => {
      controller.dispatch(() => sleep(10).then(() => "async"));

      expect(state.isPending).toEqual(true);

      controller.dispatch(() => sleep(1).then(() => "async-2"));

      expect(state.isPending).toEqual(true);

      await sleep(2);

      expect(state.data).toEqual("async-2");
      expect(state.isPending).toEqual(false);

      await sleep(12);

      expect(state.data).toEqual("async-2");
      expect(state.isPending).toEqual(false);
    });
  });
});
