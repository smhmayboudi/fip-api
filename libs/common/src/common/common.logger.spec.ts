import { CommonLogger } from "./common.logger";

describe("CommonLogger", () => {
  it("fatal should be undefined", () => {
    expect.hasAssertions();
    expect(CommonLogger.fatal("")).toBeUndefined();
  });

  it("error should be undefined", () => {
    expect.hasAssertions();
    expect(CommonLogger.error("")).toBeUndefined();
  });

  it("warn should be undefined", () => {
    expect.hasAssertions();
    expect(CommonLogger.warn("")).toBeUndefined();
  });

  it("info should be undefined", () => {
    expect.hasAssertions();
    expect(CommonLogger.info("")).toBeUndefined();
  });

  it("debug should be undefined", () => {
    expect.hasAssertions();
    expect(CommonLogger.debug("")).toBeUndefined();
  });

  it("trace should be undefined", () => {
    expect.hasAssertions();
    expect(CommonLogger.trace("")).toBeUndefined();
  });
});
