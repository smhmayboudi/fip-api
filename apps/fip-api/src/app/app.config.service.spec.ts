import { APP_CACHE_STORE_NONE } from "@fip/common";
import { AppConfigService } from "./app.config.service";
import { ConfigService } from "@nestjs/config";
import { LogLevel } from "@sentry/types";
import { Test } from "@nestjs/testing";

describe("AppConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: AppConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("apmActive should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.apmActive).toStrictEqual(true);
  });

  it("apmLogLevel should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.apmLogLevel).toStrictEqual("");
  });

  it("apmSecretToken should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.apmSecretToken).toStrictEqual("");
  });

  it("apmServerUrl should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.apmServerUrl).toStrictEqual("");
  });

  it("apmServiceName should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.apmServiceName).toStrictEqual("");
  });

  it("cacheHost should be equal to a value", () => {
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
    expect(service.cacheStore).toStrictEqual(APP_CACHE_STORE_NONE);
  });

  it("cacheTTL should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.cacheTTL).toStrictEqual(0);
  });

  it("hashIdAlphabet should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.hashIdAlphabet).toStrictEqual("");
  });

  it("hashIdMinLength should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.hashIdMinLength).toStrictEqual(0);
  });

  it("hashIdSalt should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.hashIdSalt).toStrictEqual("");
  });

  it("hashIdSeps should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.hashIdSeps).toStrictEqual("");
  });

  it("port should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.servicePort).toStrictEqual(0);
  });

  it("promDefaultLabels should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.promDefaultLabels).toStrictEqual({
      "": "",
    });
  });

  it("promDefaultMetricsEnabled should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.promDefaultMetricsEnabled).toStrictEqual(true);
  });

  it("promPath should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.promPath).toStrictEqual("");
  });

  it("promPrefix should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.promPrefix).toStrictEqual("");
  });

  it("rateLimitMax should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.rateLimitMax).toStrictEqual(0);
  });

  it("rateLimitWindowMs should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.rateLimitWindowMs).toStrictEqual(0);
  });

  it("sentryDebug should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.sentryDebug).toStrictEqual(true);
  });

  it("sentryDsn should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.sentryDsn).toStrictEqual("");
  });

  it("sentryEnviroment should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.sentryEnviroment).toStrictEqual("");
  });

  it("sentryLogLevel should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.sentryLogLevel).toStrictEqual(LogLevel.Error);
  });

  it("sentryLogLevel should be equal to a value 2", async () => {
    expect.hasAssertions();

    // TODO: interface ?
    const configServiceMock = {
      get: (_propertyPath: string, _defaultValue: any): any => 2,
    };

    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);

    expect(service.sentryLogLevel).toStrictEqual(LogLevel.Debug);
  });

  it("sentryLogLevel should be equal to a value 3", async () => {
    expect.hasAssertions();

    // TODO: interface ?
    const configServiceMock = {
      get: (_propertyPath: string, _defaultValue: any): any => 3,
    };

    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);

    expect(service.sentryLogLevel).toStrictEqual(LogLevel.Verbose);
  });

  it("sentryLogLevel should be equal to a value 4", async () => {
    expect.hasAssertions();

    // TODO: interface ?
    const configServiceMock = {
      get: (_propertyPath: string, _defaultValue: any): any => 4,
    };

    const module = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<AppConfigService>(AppConfigService);

    expect(service.sentryLogLevel).toStrictEqual(LogLevel.None);
  });

  it("sentryRelease should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.sentryRelease).toStrictEqual("");
  });
});
