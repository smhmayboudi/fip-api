import config from "./at.config";

describe("AtConfig", () => {
  it("should be equal to an object", () => {
    expect.hasAssertions();
    expect(config()).toStrictEqual({
      CACHE_HOST: undefined,
      CACHE_MAX: undefined,
      CACHE_PORT: undefined,
      CACHE_STORE: undefined,
      CACHE_TTL: undefined,
    });
  });
});
