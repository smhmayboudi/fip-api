import { AppConfigService } from "../app/app.config.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

describe("AuthConfigService", () => {
  const appConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: AuthConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthConfigService,
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
    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("jwtAccessTokenExpiresCount should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.jwtAccessTokenExpiresCount).toStrictEqual(0);
  });

  it("jwtAccessTokenExpiresIn should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.jwtAccessTokenExpiresIn).toStrictEqual(0);
  });

  it("jwtAuhSchema cacheHost should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.jwtAuhSchema).toStrictEqual("");
  });

  it("jwtRefreshTokenExpiresIn should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.jwtRefreshTokenExpiresIn).toStrictEqual(0);
  });

  it("telegramBotToken should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.telegramBotToken).toStrictEqual("");
  });

  it("telegramQueryExpiration should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.telegramQueryExpiration).toStrictEqual(0);
  });
});
