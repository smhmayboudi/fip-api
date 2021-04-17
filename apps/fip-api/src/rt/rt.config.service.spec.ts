import { AppConfigService } from "../app/app.config.service";
import { ConfigService } from "@nestjs/config";
import { RtConfigService } from "./rt.config.service";
import { RtConfigServiceInterface } from "./rt.config.service.interface";
import { Test } from "@nestjs/testing";

describe("RtConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: RtConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: RtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RtConfigService,
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<RtConfigService>(RtConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("cacheHost cacheHost should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.cacheHost).toStrictEqual("");
  });

  it("cacheMax should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.cacheMax).toStrictEqual(0);
  });

  it("cachePort should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.cachePort).toStrictEqual(0);
  });

  it("cacheStore should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.cacheStore).toStrictEqual("");
  });

  it("cacheTTL should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.cacheTTL).toStrictEqual(0);
  });
});
