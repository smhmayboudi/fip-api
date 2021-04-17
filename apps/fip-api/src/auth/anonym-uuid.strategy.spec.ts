import { AnonymUUIDStrategy } from "./anonym-uuid.strategy";

describe("AnonymUUIDStrategy", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new AnonymUUIDStrategy()).toBeDefined();
  });

  it("validate should be equal to a sub", async () => {
    expect.hasAssertions();
    expect(await new AnonymUUIDStrategy().validate(undefined)).toStrictEqual({
      sub: "0",
    });
  });

  it("validate should throw an error", async () => {
    expect.hasAssertions();
    await expect(new AnonymUUIDStrategy().validate("")).rejects.toThrow("");
  });
});
