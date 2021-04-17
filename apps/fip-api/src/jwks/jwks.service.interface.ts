import {
  JwksFindOneReqDto,
  JwksGetOneRandomReqDto,
  JwksResDto,
} from "@fip/common";

export interface JwksServiceInterface {
  findOne: (
    dto: JwksFindOneReqDto,
    sub: number
  ) => Promise<JwksResDto | undefined>;
  getOneRandom: (
    dto: JwksGetOneRandomReqDto,
    sub: number
  ) => Promise<JwksResDto | undefined>;
}
