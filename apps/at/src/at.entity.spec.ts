import { AtEntity } from "./at.entity";

describe("AtEntity", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new AtEntity(0, 0, 0, 0, 0, "")).toBeDefined();
  });
});
