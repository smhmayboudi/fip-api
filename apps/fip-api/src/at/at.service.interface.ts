import {
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtFindReqDto,
  AtResDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@fip/common";

export interface AtServiceInterface {
  delete: (dto: AtDeleteReqDto, sub: number) => Promise<AtResDto | undefined>;
  deleteByToken: (
    dto: AtDeleteByTokenReqDto,
    sub: number
  ) => Promise<AtResDto | undefined>;
  find: (dto: AtFindReqDto, sub: number) => Promise<AtResDto[] | undefined>;
  findOne: (dto: AtFindOneReqDto, sub: number) => Promise<AtResDto | undefined>;
  findOneByToken: (
    dto: AtFindOneByTokenReqDto,
    sub: number
  ) => Promise<AtResDto | undefined>;
  save: (dto: AtResDto, sub: number) => Promise<AtResDto | undefined>;
  update: (dto: AtResDto, sub: number) => Promise<AtResDto | undefined>;
  validate: (
    dto: AtValidateReqDto,
    sub: number
  ) => Promise<AtResDto | undefined>;
  validateByToken: (
    dto: AtValidateByTokenReqDto,
    sub: number
  ) => Promise<AtResDto | undefined>;
}
