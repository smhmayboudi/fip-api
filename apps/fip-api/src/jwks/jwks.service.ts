import { ApmAfterMethod, ApmBeforeMethod } from "@fip/apm";
import {
  CommonClientKafka,
  CommonKafkaReqDto,
  CommonKafkaValueResDto,
  JWKS,
  JWKS_FIND_ONE,
  JWKS_GET_ONE_RANDOM,
  JwksFindOneReqDto,
  JwksGetOneRandomReqDto,
  JwksResDto,
} from "@fip/common";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { JwksServiceInterface } from "./jwks.service.interface";
import { PromMethodCounter } from "@fip/prom";

@Injectable()
// @PromInstanceCounter
export class JwksService implements JwksServiceInterface {
  constructor(
    @Inject(JWKS) private readonly jwksClientKafka: CommonClientKafka
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(
    dto: JwksFindOneReqDto,
    sub: number
  ): Promise<JwksResDto | undefined> {
    const jwks = await this.jwksClientKafka
      .send<
        CommonKafkaValueResDto<JwksResDto, JwksFindOneReqDto>,
        CommonKafkaReqDto<JwksFindOneReqDto>
      >(JWKS_FIND_ONE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (jwks.err !== undefined) {
      throw new InternalServerErrorException(jwks.err);
    }
    return jwks.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getOneRandom(
    dto: JwksGetOneRandomReqDto,
    sub: number
  ): Promise<JwksResDto | undefined> {
    const jwks = await this.jwksClientKafka
      .send<
        CommonKafkaValueResDto<JwksResDto, JwksGetOneRandomReqDto>,
        CommonKafkaReqDto<JwksGetOneRandomReqDto>
      >(JWKS_GET_ONE_RANDOM, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (jwks.err !== undefined) {
      throw new InternalServerErrorException(jwks.err);
    }
    return jwks.res;
  }
}
