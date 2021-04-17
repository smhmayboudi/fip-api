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
import { UserEntityRepository } from "./user.entity.repository";
import { UserEntityRepositoryInterface } from "./user.entity.repository.interface";
import { UserService } from "./user.service";

describe("UserService", () => {
  const userEntity: UserResDto = {
    id: 0,
  };

  const userEntityRepositoryMock: UserEntityRepositoryInterface = {
    find: () => Promise.resolve([userEntity]),
    findOne: () => Promise.resolve(userEntity),
    save: <UserEntity>(): Promise<UserEntity> =>
      (Promise.resolve(userEntity) as unknown) as Promise<UserEntity>,
  };

  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserEntityRepository, useValue: userEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("find should be equal to an array of users", async () => {
    expect.hasAssertions();
    expect(await service.find()).toStrictEqual([userEntity]);
  });

  it("findOne should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toStrictEqual(userEntity);
  });

  it("findOneByTelegramId should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserFindOneByTelegramIdReqDto = {
      telegramId: 0,
    };
    expect(await service.findOneByTelegramId(dto)).toStrictEqual(userEntity);
  });

  it("findOneByUsername should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserFindOneByUsernameReqDto = {
      username: "",
    };
    expect(await service.findOneByUsername(dto)).toStrictEqual(userEntity);
  });

  it("get should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserGetReqDto = {
      id: 1,
    };
    expect(await service.get(dto)).toStrictEqual(userEntity);
  });

  it("edit should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await service.edit(dto)).toStrictEqual(userEntity);
  });

  it("save should be equal to a users", async () => {
    expect.hasAssertions();
    const dto: UserSaveReqDto = {
      id: 0,
      telegramId: 0,
    };
    expect(await service.save(dto)).toStrictEqual(userEntity);
  });
});
