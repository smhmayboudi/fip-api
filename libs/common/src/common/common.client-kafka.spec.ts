import { CommonClientKafka } from "./common.client-kafka";

describe("CommonClientKafka", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new CommonClientKafka()).toBeDefined();
  });
});
