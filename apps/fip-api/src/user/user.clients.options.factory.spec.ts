import { APP_CACHE_STORE_NONE } from "@fip/common";
import { Test } from "@nestjs/testing";
import { UserClientsOptionsFactory } from "./user.clients.options.factory";
import { UserConfigService } from "./at.config.service";
import { UserConfigServiceInterface } from "./at.config.service.interface";

describe("UserClientsOptionsFactory", () => {
  const userConfigServiceMock: UserConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: UserConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserConfigService,
          useValue: userConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<UserConfigService>(UserConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new UserClientsOptionsFactory(service)).toBeDefined();
  });

  it("createClientsOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(
      new UserClientsOptionsFactory(service).createClientsOptions()
    ).toBeDefined();
  });

  it("createClientsOptions should be equal to an option with store none", async () => {
    expect.hasAssertions();

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserConfigService,
          useValue: {
            ...userConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<UserConfigService>(UserConfigService);

    expect(
      new UserClientsOptionsFactory(service).createClientsOptions()
    ).toStrictEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
