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
  edit: (dto: UserEditReqDto) => Promise<UserResDto>;
  find: (dto: UserFindReqDto) => Promise<UserResDto[]>;
  findOne: (dto: UserFindOneReqDto) => Promise<UserResDto | undefined>;
  findOneByTelegramId: (
    dto: UserFindOneByTelegramIdReqDto
  ) => Promise<UserResDto | undefined>;
  findOneByUsername: (
    dto: UserFindOneByUsernameReqDto
  ) => Promise<UserResDto | undefined>;
  get: (dto: UserGetReqDto) => Promise<UserResDto | undefined>;
  save: (dto: UserSaveReqDto) => Promise<UserResDto>;
}
