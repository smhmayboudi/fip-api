import { UserGenderType } from "./user.gender.type";

describe("UserGenderType", () => {
  it("should be equal to user gender type", () => {
    expect.hasAssertions();
    expect(UserGenderType).toStrictEqual({
      female: "female",
      male: "male",
    });
  });
});
