import { AppHealthIndicator } from "./app.health.indicator";

describe("AppConfig", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new AppHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect.hasAssertions();
    expect(await new AppHealthIndicator().isHealthy()).toStrictEqual({
      app: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
