import { Test, TestingModule } from "@nestjs/testing";

import { AtEventsGateway } from "./at.events.gateway";

describe("AtEventsGateway", () => {
  let gateway: AtEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtEventsGateway],
    }).compile();

    gateway = module.get<AtEventsGateway>(AtEventsGateway);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(gateway).toBeDefined();
  });

  it("handleMessage should be equal to an unknown", () => {
    expect.hasAssertions();
    expect(gateway.handleMessage({})).toStrictEqual(true);
  });
});
