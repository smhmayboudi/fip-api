import { UserEditReqDto, UserResDto } from "@fip/common";

import { Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserServiceInterface } from "./user.service.interface";

describe("UserController", () => {
  const user: UserResDto = {
    id: 0,
    telegramId: 0,
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

  let controller: UserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(controller).toBeDefined();
  });

  it("find should return an array of users", async () => {
    expect.hasAssertions();
    expect(await controller.find()).toStrictEqual([user]);
  });

  it("get should return a users", async () => {
    expect.hasAssertions();
    expect(await controller.get(0)).toStrictEqual(user);
  });

  it("edit should return a users", async () => {
    expect.hasAssertions();
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await controller.edit(dto, 0)).toStrictEqual(user);
  });
});
