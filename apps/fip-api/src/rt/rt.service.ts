import { ApmAfterMethod, ApmBeforeMethod } from "@fip/apm";
import {
  CommonClientKafka,
  CommonKafkaReqDto,
  CommonKafkaValueResDto,
  RT,
  RT_BLOCK,
  RT_BLOCK_BY_TOKEN,
  RT_DELETE,
  RT_DELETE_BY_TOKEN,
  RT_FIND,
  RT_FIND_ONE,
  RT_FIND_ONE_BY_TOKEN,
  RT_SAVE,
  RT_VALIDATE,
  RT_VALIDATE_BY_TOKEN,
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
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { PromMethodCounter } from "@fip/prom";
import { RtServiceInterface } from "./rt.service.interface";

@Injectable()
// @PromInstanceCounter
export class RtService implements RtServiceInterface {
  constructor(@Inject(RT) private readonly rtClientKafka: CommonClientKafka) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async block(dto: RtBlockReqDto, sub: number): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtBlockReqDto>,
        CommonKafkaReqDto<RtBlockReqDto>
      >(RT_BLOCK, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async blockByToken(
    dto: RtBlockByTokenReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtBlockByTokenReqDto>,
        CommonKafkaReqDto<RtBlockByTokenReqDto>
      >(RT_BLOCK_BY_TOKEN, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(
    dto: RtDeleteReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtDeleteReqDto>,
        CommonKafkaReqDto<RtDeleteReqDto>
      >(RT_DELETE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: RtDeleteByTokenReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtDeleteByTokenReqDto>,
        CommonKafkaReqDto<RtDeleteByTokenReqDto>
      >(RT_DELETE_BY_TOKEN, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(dto: RtFindReqDto, sub: number): Promise<RtResDto[] | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto[], RtFindReqDto>,
        CommonKafkaReqDto<RtFindReqDto>
      >(RT_FIND, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(
    dto: RtFindOneReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtFindOneReqDto>,
        CommonKafkaReqDto<RtFindOneReqDto>
      >(RT_FIND_ONE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByToken(
    dto: RtFindOneByTokenReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtFindOneByTokenReqDto>,
        CommonKafkaReqDto<RtFindOneByTokenReqDto>
      >(RT_FIND_ONE_BY_TOKEN, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: RtSaveReqDto, sub: number): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtSaveReqDto>,
        CommonKafkaReqDto<RtSaveReqDto>
      >(RT_SAVE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validate(
    dto: RtValidateReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    // const { SchemaRegistry } = require("@kafkajs/confluent-schema-registry");
    // const registry = new SchemaRegistry({ host: "http://localhost:8081" });
    // const schemaId1 = await registry.getLatestSchemaId(
    //   "fip.common.RtValidateReqDto"
    // );
    // const schema1 = await registry.getSchema(schemaId1);
    // console.log("schema1", schema1);
    // const schemaId2 = await registry.getLatestSchemaId("fip.common.RtResDto");
    // const schema2 = await registry.getSchema(schemaId2);
    // console.log("schema2", schema2);
    // const schemaId3 = await registry.getLatestSchemaId("RT_VALIDATE-value");
    // console.log("schemaId3", schemaId3);
    // const schema3 = await registry.getSchema(schemaId3);
    // console.log("schema3", schema3);
    // const dtoNew = await registry.encode(schemaId3, { req: dto });
    // console.log("dtoNew", dtoNew);
    const avro = require("avsc");
    const registry = {};
    avro.parse(
      "/Users/smhmayboudi/Developer/fip-api/libs/common/src/rt/dto/req/rt.validate.req.dto.avsc",
      {
        registry,
      }
    );
    avro.parse(
      "/Users/smhmayboudi/Developer/fip-api/libs/common/src/rt/dto/res/rt.res.dto.avsc",
      {
        registry,
      }
    );
    const type = avro.parse(
      "/Users/smhmayboudi/Developer/fip-api/apps/fip-api/src/rt/rt.validate.dto.avsc",
      {
        registry,
      }
    );

    const DEFAULT_OFFSET = 0;

    const MAGIC_BYTE = Buffer.alloc(1);

    const encode = (schema: any, registryId: number, jsonPayload: any) => {
      let avroPayload;
      try {
        avroPayload = schema.toBuffer(jsonPayload);
      } catch (error) {
        // error.paths = collectInvalidPaths(schema, jsonPayload);
        console.error(error);
        throw error;
      }

      const registryIdBuffer = Buffer.alloc(4);
      registryIdBuffer.writeInt32BE(registryId, DEFAULT_OFFSET);

      return Buffer.concat([MAGIC_BYTE, registryIdBuffer, avroPayload]);
    };

    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtValidateReqDto>,
        CommonKafkaReqDto<any>
      >(RT_VALIDATE, {
        key: sub,
        value: encode(type, 41, { req: dto }),
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async validateByToken(
    dto: RtValidateByTokenReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    const rt = await this.rtClientKafka
      .send<
        CommonKafkaValueResDto<RtResDto, RtValidateByTokenReqDto>,
        CommonKafkaReqDto<RtValidateByTokenReqDto>
      >(RT_VALIDATE_BY_TOKEN, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (rt.err !== undefined) {
      throw new InternalServerErrorException(rt.err);
    }
    return rt.res;
  }
}
