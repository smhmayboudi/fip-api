import { Test, TestingModule } from "@nestjs/testing";

import { UserEventsGateway } from "./user.events.gateway";

describe("UserEventsGateway", () => {
  let gateway: UserEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEventsGateway],
    }).compile();

    gateway = module.get<UserEventsGateway>(UserEventsGateway);
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
