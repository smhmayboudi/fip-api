import { APP_CACHE_STORE_NONE } from "@fip/common";
import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import { RtConfigService } from "./rt.config.service";
import { RtConfigServiceInterface } from "./rt.config.service.interface";
import { Test } from "@nestjs/testing";

describe("RtCacheOptionsFactory", () => {
  const rtConfigServiceMock: RtConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: RtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RtConfigService,
          useValue: rtConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<RtConfigService>(RtConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new RtCacheOptionsFactory(service)).toBeDefined();
  });

  it("createCacheOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(
      new RtCacheOptionsFactory(service).createCacheOptions()
    ).toBeDefined();
  });

  it("createCacheOptions should be equal to an option with store none", async () => {
    expect.hasAssertions();

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RtConfigService,
          useValue: {
            ...rtConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<RtConfigService>(RtConfigService);

    expect(
      new RtCacheOptionsFactory(service).createCacheOptions()
    ).toStrictEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
