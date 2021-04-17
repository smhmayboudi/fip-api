import { UserEntity } from "./user.entity";

describe("UserEntity", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new UserEntity(0)).toBeDefined();
  });
});
