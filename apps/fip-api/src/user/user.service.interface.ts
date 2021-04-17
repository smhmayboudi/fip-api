import {
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserFindReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@fip/common";

export interface UserServiceInterface {
  edit: (dto: UserEditReqDto, sub: number) => Promise<UserResDto | undefined>;
  find: (dto: UserFindReqDto, sub: number) => Promise<UserResDto[] | undefined>;
  findOne: (
    dto: UserFindOneReqDto,
    sub: number
  ) => Promise<UserResDto | undefined>;
  findOneByTelegramId: (
    dto: UserFindOneByTelegramIdReqDto,
    sub: number
  ) => Promise<UserResDto | undefined>;
  findOneByUsername: (
    dto: UserFindOneByUsernameReqDto,
    sub: number
  ) => Promise<UserResDto | undefined>;
  get: (dto: UserGetReqDto, sub: number) => Promise<UserResDto | undefined>;
  save: (dto: UserSaveReqDto, sub: number) => Promise<UserResDto | undefined>;
}
