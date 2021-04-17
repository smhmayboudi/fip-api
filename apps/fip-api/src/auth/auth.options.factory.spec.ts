import { AuthAuthOptionsFactory } from "./auth.options.factory";

describe("AuthAuthOptionsFactory", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new AuthAuthOptionsFactory()).toBeDefined();
  });

  it("createAuthOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(new AuthAuthOptionsFactory().createAuthOptions()).toStrictEqual({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    });
  });
});
