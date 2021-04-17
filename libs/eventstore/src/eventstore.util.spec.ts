import {
  getOrCreateEventstoreInstance,
  getTokenName,
  makeDefaultOptions,
} from "./eventstore.util";

describe("EventstoreUtil", () => {
  it("getOrCreateEventstoreInstance should be instance of an agent", () => {
    expect.hasAssertions();
    expect(getOrCreateEventstoreInstance({})).toBeInstanceOf(Object);
  });

  it("getTokenName should be instance of same agent", () => {
    expect.hasAssertions();
    expect(getOrCreateEventstoreInstance({})).toBeInstanceOf(Object);
  });

  it("getTokenName should be instance of a gauge metric", () => {
    expect.hasAssertions();
    expect(getTokenName("TargetName", "methodName")).toStrictEqual(
      "TargetName_methodName"
    );
  });

  it("makeDefaultOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(makeDefaultOptions()).toStrictEqual({});
  });
});
