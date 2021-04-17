import { EventstorePubSub } from "./eventstore.pub-sub";

describe("EventstorePubSub", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new EventstorePubSub()).toBeDefined();
  });

  it.todo("publish method should be test.");
  it.todo("publishAll method should be test.");
  it.todo("bridgeEventsTo method should be test.");
});
