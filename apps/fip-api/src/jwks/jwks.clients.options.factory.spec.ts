import { APP_CACHE_STORE_NONE } from "@fip/common";
import { JwksClientsOptionsFactory } from "./jwks.clients.options.factory";
import { JwksConfigService } from "./at.config.service";
import { JwksConfigServiceInterface } from "./at.config.service.interface";
import { Test } from "@nestjs/testing";

describe("JwksClientsOptionsFactory", () => {
  const jwksConfigServiceMock: JwksConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };

  let service: JwksConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: JwksConfigService,
          useValue: jwksConfigServiceMock,
        },
      ],
    }).compile();
    service = module.get<JwksConfigService>(JwksConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new JwksClientsOptionsFactory(service)).toBeDefined();
  });

  it("createClientsOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(
      new JwksClientsOptionsFactory(service).createClientsOptions()
    ).toBeDefined();
  });

  it("createClientsOptions should be equal to an option with store none", async () => {
    expect.hasAssertions();

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: JwksConfigService,
          useValue: {
            ...jwksConfigServiceMock,
            cacheStore: APP_CACHE_STORE_NONE,
          },
        },
      ],
    }).compile();
    service = module.get<JwksConfigService>(JwksConfigService);

    expect(
      new JwksClientsOptionsFactory(service).createClientsOptions()
    ).toStrictEqual({
      host: "",
      max: 0,
      port: 0,
      store: APP_CACHE_STORE_NONE,
      ttl: 0,
    });
  });
});
