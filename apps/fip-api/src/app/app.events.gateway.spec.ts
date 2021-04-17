import { Test, TestingModule } from "@nestjs/testing";

import { AppEventsGateway } from "./app.events.gateway";

describe("AppEventsGateway", () => {
  let gateway: AppEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppEventsGateway],
    }).compile();

    gateway = module.get<AppEventsGateway>(AppEventsGateway);
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
