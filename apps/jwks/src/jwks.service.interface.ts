import {
  JwksFindOneReqDto,
  JwksGetOneRandomReqDto,
  JwksResDto,
} from "@fip/common";

export interface JwksServiceInterface {
  findOne: (dto: JwksFindOneReqDto) => Promise<JwksResDto | undefined>;
  getOneRandom: (
    dto: JwksGetOneRandomReqDto
  ) => Promise<JwksResDto | undefined>;
}
