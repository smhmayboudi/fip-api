import { JwksEntityRepository } from "./jwks.entity.repository";

describe("JwksEntityRepository", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new JwksEntityRepository()).toBeDefined();
  });

  it.todo("getOneRandom");
});
