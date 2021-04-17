import { AtHealthIndicator } from "./at.health.indicator";

describe("AtHealthIndicator", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new AtHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect.hasAssertions();
    expect(await new AtHealthIndicator().isHealthy()).toStrictEqual({
      at: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
