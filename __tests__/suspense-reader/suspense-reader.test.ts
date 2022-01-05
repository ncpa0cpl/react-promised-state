import { SuspenseReader } from "../../src/suspense-reader/suspense-reader";
import { Catch, Err, isPending, sleep } from "../helpers";

describe("SuspenseReader", () => {
  let reader: SuspenseReader<any>;

  beforeEach(() => {
    reader = new SuspenseReader();
  });

  const defuse = () => {
    reader["promise"].catch(() => {});
  };

  it("should initiate with a pending promise", () => {
    const e = Catch(() => reader.read());

    expect(e).toBeInstanceOf(Promise);
  });

  it("should resolve the read promise on update", async () => {
    const e = Catch(() => reader.read());

    const onResolve = jest.fn();
    const onReject = jest.fn();
    e!.then(onResolve).catch(onReject);

    await sleep(1);

    expect(onResolve).toHaveBeenCalledTimes(0);
    expect(onReject).toHaveBeenCalledTimes(0);

    reader.success("foo");

    await sleep(1);

    expect(onResolve).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledTimes(0);
  });

  it("should reject the read promise on update", async () => {
    defuse();

    const e = Catch(() => reader.read());

    const onResolve = jest.fn();
    const onReject = jest.fn();
    e!.then(onResolve).catch(onReject);

    await sleep(1);

    expect(onResolve).toHaveBeenCalledTimes(0);
    expect(onReject).toHaveBeenCalledTimes(0);

    reader.fail(new Err("bar"));

    await sleep(1);

    expect(onResolve).toHaveBeenCalledTimes(0);
    expect(onReject).toHaveBeenCalledTimes(1);

    expect(onReject).toHaveBeenLastCalledWith(new Err("bar"));
  });

  it("should 'read()' return current value if it's successful", () => {
    reader.success("value");

    const v = reader.read();

    expect(v).toEqual("value");
  });

  it("should 'read()' return an error if it's failed", () => {
    defuse();
    reader.fail(new Err("baz"));

    expect(() => reader.read()).toThrow(expect.objectContaining(new Err("baz")));
  });

  it("should correctly reset", async () => {
    defuse();
    reader.fail(new Err("qux"));

    expect(() => reader.read()).toThrow(expect.objectContaining(new Err("qux")));

    reader.reset();
    defuse();

    let p = Catch(() => reader.read());
    expect(p).toBeInstanceOf(Promise);
    expect(await isPending(p!)).toEqual(true);

    reader.success("quux");
    await expect(p).resolves.toBeUndefined();

    expect(reader.read()).toEqual("quux");

    reader.reset();
    defuse();

    p = Catch(() => reader.read());
    expect(p).toBeInstanceOf(Promise);
    expect(await isPending(p!)).toEqual(true);

    reader.fail(new Err("coorg"));
    await expect(p).rejects.toMatchObject(new Err("coorg"));
    expect(() => reader.read()).toThrow(expect.objectContaining(new Err("coorg")));
  });
});
