import { UserHealthIndicator } from "./user.health.indicator";

describe("UserHealthIndicator", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new UserHealthIndicator()).toBeDefined();
  });

  it("isHealthy is true", async () => {
    expect.hasAssertions();
    expect(await new UserHealthIndicator().isHealthy()).toStrictEqual({
      user: {
        status: "up",
      },
    });
  });

  it.todo("isHealthy is false");
});
