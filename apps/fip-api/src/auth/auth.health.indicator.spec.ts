import { AuthHealthIndicator } from "./auth.health.indicator";

describe("AuthHealthIndicator", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new AuthHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect.hasAssertions();
    expect(await new AuthHealthIndicator().isHealthy()).toStrictEqual({
      auth: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
