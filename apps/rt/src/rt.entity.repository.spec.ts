import { RtEntityRepository } from "./rt.entity.repository";

describe("RtEntityRepository", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new RtEntityRepository()).toBeDefined();
  });
});
