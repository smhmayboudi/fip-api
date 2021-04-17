import { AuthTelegramPayloadReqDto, UserResDto } from "@fip/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { TelegramStrategy } from "./telegram.strategy";
import { Test } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";

describe("TelegramStrategy", () => {
  const user: UserResDto = {
    id: 0,
    telegramId: 0,
  };

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const userServiceMock: UserServiceInterface = {
    edit: () => Promise.resolve(user),
    find: () => Promise.resolve([user]),
    findOne: () => Promise.resolve(user),
    findOneByTelegramId: () => Promise.resolve(user),
    findOneByUsername: () => Promise.resolve(user),
    get: () => Promise.resolve(user),
    save: () => Promise.resolve(user),
  };

  let authConfigService: AuthConfigService;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    userService = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new TelegramStrategy(authConfigService, userService)).toBeDefined();
  });

  it("validate should be equal to an auth strategy", async () => {
    expect.hasAssertions();
    const dto: AuthTelegramPayloadReqDto = {
      authAt: 0,
      firstName: "",
      hash: "",
      id: 0,
      lastName: "",
      photoUrl: "",
      username: "",
    };
    expect(
      await new TelegramStrategy(authConfigService, userService).validate(dto)
    ).toStrictEqual({
      sub: "0",
    });
  });

  it("validate should be equal to a token", async () => {
    expect.hasAssertions();

    const userServiceMockFindOneByTelegramId: UserServiceInterface = {
      ...userServiceMock,
      findOneByTelegramId: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        {
          provide: UserService,
          useValue: userServiceMockFindOneByTelegramId,
        },
      ],
    }).compile();
    authConfigService = module.get<AuthConfigService>(AuthConfigService);
    userService = module.get<UserService>(UserService);

    const dto: AuthTelegramPayloadReqDto = {
      authAt: 0,
      firstName: "",
      hash: "",
      id: 0,
      lastName: "",
      photoUrl: "",
      username: "",
    };
    expect(
      await new TelegramStrategy(authConfigService, userService).validate(dto)
    ).toStrictEqual({
      sub: "0",
    });
  });
});
