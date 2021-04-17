import { RtEntity } from "./rt.entity";

describe("RtEntity", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new RtEntity(0, "", 0, 0, false, 0, "")).toBeDefined();
  });
});
