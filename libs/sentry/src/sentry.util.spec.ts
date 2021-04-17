import { getOrCreateSentryInstance, makeDefaultOptions } from "./sentry.util";

describe("SentryUtil", () => {
  it("getOrCreateSentryInstance should be instance of a sentry", () => {
    expect.hasAssertions();
    expect(getOrCreateSentryInstance({})).toBeDefined();
  });

  it("getOrCreateSentryInstance should be instance of the same sentry", () => {
    expect.hasAssertions();
    expect(getOrCreateSentryInstance({})).toBeDefined();
  });

  it("getOrCreateSentryInstance should be instance of a sentry with debug true", () => {
    expect.hasAssertions();
    expect(
      getOrCreateSentryInstance(
        {
          debug: true,
        },
        true
      )
    ).toBeDefined();
  });

  it("getOrCreateSentryInstance should be instance of same sentry with debug true", () => {
    expect.hasAssertions();
    expect(getOrCreateSentryInstance({})).toBeDefined();
  });

  it.todo("getOrCreateSentryInstance integrations");

  it("makeDefaultOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(makeDefaultOptions({})).toStrictEqual({});
  });
});
