import { Strategy } from "./anonym.strategy";

describe("Strategy", () => {
  const error = jest.fn();
  const success = jest.fn();
  const verifiedCallback = (err: Error, user: any, info: any): void => {
    if (err) {
      return error(err);
    }
    return success(user, info);
  };

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new Strategy(() => verifiedCallback)).toBeDefined();
  });
  it("should be defined 2", () => {
    expect.hasAssertions();
    expect(
      new Strategy({ passReqToCallback: false }, () => verifiedCallback)
    ).toBeDefined();
  });
  it("should be defined 3", async () => {
    expect.hasAssertions();
    await expect(
      new Strategy(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        undefined
      )
    ).rejects.toThrow("");
  });

  it.todo("authenticate");
  it.todo("authenticate with error");
  it.todo("authenticate with passReqToCallback");
  it.todo("authenticate throw an error");
});
