import { AppConfigService } from "./app.config.service";
import { AppConfigServiceInterface } from "./app.config.service.interface";
import { AppHashIdService } from "./app.hash-id.service";
import { Test } from "@nestjs/testing";

describe("AppHashIdService", () => {
  const appConfigServiceMock: AppConfigServiceInterface = {
    apmActive: false,
    apmLogLevel: "trace",
    apmSecretToken: "",
    apmServerUrl: "",
    apmServiceName: "",
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    hashIdAlphabet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    hashIdMinLength: 0,
    hashIdSalt: "cfhistuCFHISTU",
    hashIdSeps: "",
    promDefaultLabels: {
      "": "",
    },
    promDefaultMetricsEnabled: true,
    promPath: "",
    promPrefix: "",
    rateLimitMax: 0,
    rateLimitWindowMs: 0,
    sentryDebug: true,
    sentryDsn: "",
    sentryEnviroment: "",
    sentryLogLevel: 0,
    sentryRelease: "",
    servicePort: 0,
  };

  let service: AppHashIdService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AppConfigService, useValue: appConfigServiceMock },
        AppHashIdService,
      ],
    }).compile();
    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("decode should return a value", () => {
    expect.hasAssertions();
    const hash = "SHY";
    expect(service.decode(hash)).toStrictEqual(0);
  });

  it("encode should return a value", () => {
    expect.hasAssertions();
    const id = 0;
    expect(service.encode(id)).toStrictEqual("SHY");
  });

  it.todo("encoded === ''");
});
