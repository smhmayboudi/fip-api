import { JwksEntity } from "./jwks.entity";

describe("JwksEntity", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new JwksEntity("", "", "")).toBeDefined();
  });
});
