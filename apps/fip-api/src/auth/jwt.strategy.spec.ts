import {
  AtResDto,
  AuthJwtPayloadReqDto,
  JwksResDto,
  RtResDto,
} from "@fip/common";

import { AtService } from "../at/at.service";
import { AtServiceInterface } from "../at/at.service.interface";
import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { JwksService } from "../jwks/jwks.service";
import { JwksServiceInterface } from "../jwks/jwks.service.interface";
import { JwtStrategy } from "./jwt.strategy";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { Test } from "@nestjs/testing";

describe("JwtStrategy", () => {
  const at: AtResDto = {
    count: 0,
    createdAt: 0,
    expireAt: 1000,
    id: 0,
    token: "",
    userId: 0,
  };
  const jwks: JwksResDto = {
    id: "",
    privateKey: "",
    publicKey: "",
  };
  const rt: RtResDto = {
    createdAt: 0,
    description: "",
    expireAt: 1000,
    id: 0,
    isBlocked: false,
    token: "",
    userId: 0,
  };

  const atServiceMock: AtServiceInterface = {
    delete: () => Promise.resolve(at),
    deleteByToken: () => Promise.resolve(at),
    find: () => Promise.resolve([at]),
    findOne: () => Promise.resolve(at),
    findOneByToken: () => Promise.resolve(at),
    save: () => Promise.resolve(at),
    update: () => Promise.resolve(at),
    validate: () => Promise.resolve(at),
    validateByToken: () => Promise.resolve(at),
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

  let atService: AtService;
  let authConfigService: AuthConfigService;
  let jwksService: JwksService;
  let rtService: RtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AtService, useValue: atServiceMock },
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(
      new JwtStrategy(atService, authConfigService, jwksService, rtService)
    ).toBeDefined();
  });

  it("validate should be equal to an auth strategy", async () => {
    expect.hasAssertions();

    const authConfigServiceMockJwtAccessTokenExpiresCount: AuthConfigServiceInterface = {
      ...authConfigServiceMock,
      jwtAccessTokenExpiresCount: 1,
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AtService,
          useValue: atServiceMock,
        },
        {
          provide: AuthConfigService,
          useValue: authConfigServiceMockJwtAccessTokenExpiresCount,
        },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);

    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    expect(
      await new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).toStrictEqual({
      sub: "",
    });
  });

  it("validate should throw an error", async () => {
    expect.hasAssertions();

    const rtServiceMockValidate: RtServiceInterface = {
      ...rtServiceMock,
      validate: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: AtService, useValue: atServiceMock },
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMockValidate },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);

    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    await expect(
      new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).rejects.toThrow("");
  });

  it("validate should throw an error 2", async () => {
    expect.hasAssertions();
    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    await expect(
      new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).rejects.toThrow("");
  });

  it("validate should throw an error 3", async () => {
    expect.hasAssertions();

    const atServiceMockValidateByToken: AtServiceInterface = {
      ...atServiceMock,
      validateByToken: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: AtService,
          useValue: atServiceMockValidateByToken,
        },
        {
          provide: AuthConfigService,
          useValue: authConfigServiceMock,
        },
        { provide: JwksService, useValue: jwksServiceMock },
        { provide: RtService, useValue: rtServiceMock },
      ],
    }).compile();
    atService = module.get<AtService>(AtService);
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    jwksService = module.get<JwksService>(JwksService);
    rtService = module.get<RtService>(RtService);

    const dto: AuthJwtPayloadReqDto = {
      exp: 0,
      iat: 0,
      jti: "",
      sub: "",
    };
    expect(
      await new JwtStrategy(
        atService,
        authConfigService,
        jwksService,
        rtService
      ).validate(dto)
    ).toStrictEqual({
      sub: "",
    });
  });
});
