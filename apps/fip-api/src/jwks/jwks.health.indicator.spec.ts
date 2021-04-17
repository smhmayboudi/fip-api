import { JwksHealthIndicator } from "./jwks.health.indicator";

describe("JwksHealthIndicator", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new JwksHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect.hasAssertions();
    expect(await new JwksHealthIndicator().isHealthy()).toStrictEqual({
      jwks: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
