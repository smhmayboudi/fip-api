import {
  AuthAccessTokenReqDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  JwksResDto,
  RtResDto,
} from "@fip/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthService } from "./auth.service";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { JwtService } from "@nestjs/jwt";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { Test } from "@nestjs/testing";

jest.mock("crypto-random-string", () => jest.fn(() => "1"));

describe("AuthService", () => {
  const rt: RtResDto = {
    createdAt: 0,
    description: "",
    expireAt: 1000,
    id: 0,
    isBlocked: false,
    token: "",
    userId: 0,
  };
  const jwks: JwksResDto = {
    id: "",
    privateKey: "",
    publicKey: "",
  };

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const jwksServiceMock: JwksServiceInterface = {
    findOne: () => Promise.resolve(jwks),
    getOneRandom: () => Promise.resolve(jwks),
  };
  // TODO: interface ?
  const jwtServiceMock = {
    sign: (): string => "0",
  };
  const rtServiceMock: RtServiceInterface = {
    block: () => Promise.resolve(rt),
    blockByToken: () => Promise.resolve(rt),
    delete: () => Promise.resolve(rt),
    deleteByToken: () => Promise.resolve(rt),
    find: () => Promise.resolve([rt]),
    findOne: () => Promise.resolve(rt),
    findOneByToken: () => Promise.resolve(rt),
    save: () => Promise.resolve(rt),
    validate: () => Promise.resolve(rt),
    validateByToken: () => Promise.resolve(rt),
  };

  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("accessToken should be equal to a token", async () => {
    expect.hasAssertions();
    const dto: AuthAccessTokenReqDto = {
      sub: 1,
    };
    expect(await service.accessToken(dto)).toStrictEqual({
      at: "0",
    });
  });

  it("accessToken should be equal to a token 2", async () => {
    expect.hasAssertions();

    const jwksServiceMockGetOneRandom: JwksServiceInterface = {
      ...jwksServiceMock,
      getOneRandom: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMockGetOneRandom },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);

    const dto: AuthAccessTokenReqDto = {
      sub: 1,
    };
    await expect(service.accessToken(dto)).rejects.toThrow("");
  });

  it("deleteByToken should be equal to a token", async () => {
    expect.hasAssertions();
    const dto: AuthDeleteByTokenReqDto = {
      token: "",
    };
    expect(await service.deleteByToken(dto)).toStrictEqual(rt);
  });

  it("refreshToken should be equal to a token", async () => {
    expect.hasAssertions();
    const dto: AuthRefreshTokenReqDto = {
      rt: "0",
      sub: 1,
    };
    expect(await service.refreshToken(dto)).toStrictEqual({
      at: "0",
      rt: "0",
    });
  });

  it("refreshToken should be equal to a token 2", async () => {
    expect.hasAssertions();
    const dto: AuthRefreshTokenReqDto = {
      rt: "",
      sub: 1,
    };
    expect(await service.refreshToken(dto)).toStrictEqual({
      at: "0",
      rt: "1",
    });
  });

  it("refreshToken should throw an error", async () => {
    expect.hasAssertions();

    const jwksServiceMockGetOneRandom: JwksServiceInterface = {
      ...jwksServiceMock,
      getOneRandom: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMockGetOneRandom },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);

    const dto: AuthRefreshTokenReqDto = {
      sub: 1,
    };
    await expect(service.refreshToken(dto)).rejects.toThrow("");
  });
});
