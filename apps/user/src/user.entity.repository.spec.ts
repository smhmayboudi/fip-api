import { UserEntityRepository } from "./user.entity.repository";

describe("UserEntityRepository", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new UserEntityRepository()).toBeDefined();
  });
});
