import { AuthConfigService } from "./auth.config.service";
import { AuthConfigServiceInterface } from "./auth.config.service.interface";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { RtResDto } from "@fip/common";
import { Test } from "@nestjs/testing";

describe("AuthController", () => {
  const rt: RtResDto = {
    createdAt: 0,
    description: "",
    expireAt: 1000,
    id: 0,
    isBlocked: false,
    token: "",
    userId: 0,
  };

  const authConfigServiceMock: AuthConfigServiceInterface = {
    jwtAccessTokenExpiresCount: 0,
    jwtAccessTokenExpiresIn: 0,
    jwtAuhSchema: "",
    jwtRefreshTokenExpiresIn: 0,
    telegramBotToken: "000000000:00000000000000000000000000000000000",
    telegramQueryExpiration: 0,
  };
  const authServiceMock: AuthServiceInterface = {
    accessToken: () =>
      Promise.resolve({
        at: "",
      }),
    deleteByToken: () => Promise.resolve(rt),
    refreshToken: () =>
      Promise.resolve({
        at: "",
        rt: "",
      }),
  };

  let controller: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthConfigService, useValue: authConfigServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(controller).toBeDefined();
  });

  it("login should be equal to a token", async () => {
    expect.hasAssertions();
    expect(await controller.login(0)).toStrictEqual({
      at: "",
      rt: "",
    });
  });

  it("logout should be equal to a rt", async () => {
    expect.hasAssertions();
    expect(await controller.logout("")).toStrictEqual(rt);
  });

  it("telegramCallback should be equal to a token", async () => {
    expect.hasAssertions();
    expect(await controller.telegram(0)).toStrictEqual({
      at: "",
      rt: "",
    });
  });

  it("token should be equal to a token", async () => {
    expect.hasAssertions();
    expect(await controller.token(0)).toStrictEqual({
      at: "",
    });
  });
});
