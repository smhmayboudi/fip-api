import {
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@fip/common";

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

  it("find should be equal to an array of users", async () => {
    expect.hasAssertions();
    expect(await controller.find()).toStrictEqual([user]);
  });

  it("findOne should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserFindOneReqDto = {
      id: 0,
    };
    expect(await controller.findOne(dto)).toStrictEqual(user);
  });

  it("findOneByTelegramId should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserFindOneByTelegramIdReqDto = {
      telegramId: 0,
    };
    expect(await controller.findOneByTelegramId(dto)).toStrictEqual(user);
  });

  it("findOneByUsername should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserFindOneByUsernameReqDto = {
      username: "",
    };
    expect(await controller.findOneByUsername(dto)).toStrictEqual(user);
  });

  it("get should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserGetReqDto = {
      id: 1,
    };
    expect(await controller.get(dto)).toStrictEqual(user);
  });

  it("edit should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await controller.edit(dto)).toStrictEqual(user);
  });

  it("save should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserSaveReqDto = {
      id: 0,
      telegramId: 0,
    };
    expect(await controller.save(dto)).toStrictEqual(user);
  });
});
