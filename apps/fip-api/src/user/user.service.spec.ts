import {
  USER,
  USER_FIND,
  UserEditReqDto,
  UserGetReqDto,
  UserResDto,
} from "@fip/common";

import { Test } from "@nestjs/testing";
import { UserService } from "./user.service";
import { of } from "rxjs";

describe("UserService", () => {
  const user: UserResDto = {
    id: 0,
    telegramId: 0,
  };

  // TODO: interface ?
  const userClientKafkaMock = {
    send: (token: string) => (token === USER_FIND ? of([user]) : of(user)),
  };

  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: USER, useValue: userClientKafkaMock },
        UserService,
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("find should return an array of users", async () => {
    expect.hasAssertions();
    expect(await service.find()).toStrictEqual([user]);
  });

  it("get should return a users", async () => {
    expect.hasAssertions();
    const dto: UserGetReqDto = {
      id: 1,
    };
    expect(await service.get(dto)).toStrictEqual(user);
  });

  it("edit should return a users", async () => {
    expect.hasAssertions();
    const dto: UserEditReqDto = {
      sub: 1,
    };
    expect(await service.edit(dto)).toStrictEqual(user);
  });
});
