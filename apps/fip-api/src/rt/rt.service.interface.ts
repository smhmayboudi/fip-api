import {
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteByTokenReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtFindReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@fip/common";

export interface RtServiceInterface {
  block: (dto: RtBlockReqDto, sub: number) => Promise<RtResDto | undefined>;
  blockByToken: (
    dto: RtBlockByTokenReqDto,
    sub: number
  ) => Promise<RtResDto | undefined>;
  delete: (dto: RtDeleteReqDto, sub: number) => Promise<RtResDto | undefined>;
  deleteByToken: (
    dto: RtDeleteByTokenReqDto,
    sub: number
  ) => Promise<RtResDto | undefined>;
  find: (dto: RtFindReqDto, sub: number) => Promise<RtResDto[] | undefined>;
  findOne: (dto: RtFindOneReqDto, sub: number) => Promise<RtResDto | undefined>;
  findOneByToken: (
    dto: RtFindOneByTokenReqDto,
    sub: number
  ) => Promise<RtResDto | undefined>;
  save: (dto: RtSaveReqDto, sub: number) => Promise<RtResDto | undefined>;
  validate: (
    dto: RtValidateReqDto,
    sub: number
  ) => Promise<RtResDto | undefined>;
  validateByToken: (
    dto: RtValidateByTokenReqDto,
    sub: number
  ) => Promise<RtResDto | undefined>;
}
