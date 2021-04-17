import { AtEntityRepository } from "./at.entity.repository";

describe("AtEntityRepository", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new AtEntityRepository()).toBeDefined();
  });
});
