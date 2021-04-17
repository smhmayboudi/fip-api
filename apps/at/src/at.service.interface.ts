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
  delete: (dto: AtDeleteReqDto) => Promise<AtResDto | undefined>;
  deleteByToken: (dto: AtDeleteByTokenReqDto) => Promise<AtResDto | undefined>;
  find: (dto: AtFindReqDto) => Promise<AtResDto[]>;
  findOne: (dto: AtFindOneReqDto) => Promise<AtResDto | undefined>;
  findOneByToken: (
    dto: AtFindOneByTokenReqDto
  ) => Promise<AtResDto | undefined>;
  save: (dto: AtResDto) => Promise<AtResDto>;
  update: (dto: AtResDto) => Promise<AtResDto | undefined>;
  validate: (dto: AtValidateReqDto) => Promise<AtResDto | undefined>;
  validateByToken: (
    dto: AtValidateByTokenReqDto
  ) => Promise<AtResDto | undefined>;
}
