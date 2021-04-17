import { AppConfigService } from "../app/app.config.service";
import { AtConfigService } from "./at.config.service";
import { AtConfigServiceInterface } from "./at.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

describe("AtConfigService", () => {
  // TODO: interface ?
  const appConfigServiceMock: AtConfigServiceInterface = {
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

  let service: AtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AtConfigService,
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
    service = module.get<AtConfigService>(AtConfigService);
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
