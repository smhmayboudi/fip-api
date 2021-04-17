import {
  AT,
  AT_DELETE,
  AT_DELETE_BY_TOKEN,
  AT_FIND,
  AT_FIND_ONE,
  AT_FIND_ONE_BY_TOKEN,
  AT_SAVE,
  AT_UPDATE,
  AT_VALIDATE,
  AT_VALIDATE_BY_TOKEN,
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtFindReqDto,
  AtResDto,
  AtSaveReqDto,
  AtUpdateReqDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
  CommonClientKafka,
  CommonKafkaReqDto,
  CommonKafkaValueResDto,
} from "@fip/common";

import { ApmAfterMethod, ApmBeforeMethod } from "@fip/apm";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { AtServiceInterface } from "./at.service.interface";

import { PromMethodCounter } from "@fip/prom";

@Injectable()
// @PromInstanceCounter
export class AtService implements AtServiceInterface {
  constructor(@Inject(AT) private readonly atClientKafka: CommonClientKafka) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(
    dto: AtDeleteReqDto,
    sub: number
  ): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtDeleteReqDto>,
        CommonKafkaReqDto<AtDeleteReqDto>
      >(AT_DELETE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: AtDeleteByTokenReqDto,
    sub: number
  ): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtDeleteByTokenReqDto>,
        CommonKafkaReqDto<AtDeleteByTokenReqDto>
      >(AT_DELETE_BY_TOKEN, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(dto: AtFindReqDto, sub: number): Promise<AtResDto[] | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto[], AtFindReqDto>,
        CommonKafkaReqDto<AtFindReqDto>
      >(AT_FIND, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(
    dto: AtFindOneReqDto,
    sub: number
  ): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtFindOneReqDto>,
        CommonKafkaReqDto<AtFindOneReqDto>
      >(AT_FIND_ONE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(
    dto: AtFindOneByTokenReqDto,
    sub: number
  ): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtFindOneByTokenReqDto>,
        CommonKafkaReqDto<AtFindOneByTokenReqDto>
      >(AT_FIND_ONE_BY_TOKEN, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: AtSaveReqDto, sub: number): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtSaveReqDto>,
        CommonKafkaReqDto<AtSaveReqDto>
      >(AT_SAVE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async update(
    dto: AtUpdateReqDto,
    sub: number
  ): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtUpdateReqDto>,
        CommonKafkaReqDto<AtUpdateReqDto>
      >(AT_UPDATE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(
    dto: AtValidateByTokenReqDto,
    sub: number
  ): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtValidateByTokenReqDto>,
        CommonKafkaReqDto<AtValidateByTokenReqDto>
      >(AT_VALIDATE_BY_TOKEN, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validate(
    dto: AtValidateReqDto,
    sub: number
  ): Promise<AtResDto | undefined> {
    const at = await this.atClientKafka
      .send<
        CommonKafkaValueResDto<AtResDto, AtValidateReqDto>,
        CommonKafkaReqDto<AtValidateReqDto>
      >(AT_VALIDATE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (at.err !== undefined) {
      throw new InternalServerErrorException(at.err);
    }
    return at.res;
  }
}
