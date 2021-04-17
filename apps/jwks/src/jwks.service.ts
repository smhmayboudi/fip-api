import { ApmAfterMethod, ApmBeforeMethod } from "@fip/apm";
import {
  JwksFindOneReqDto,
  JwksGetOneRandomReqDto,
  JwksResDto,
} from "@fip/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksServiceInterface } from "./jwks.service.interface";
import { PromMethodCounter } from "@fip/prom";

@Injectable()
// @PromInstanceCounter
export class JwksService implements JwksServiceInterface {
  constructor(
    @InjectRepository(JwksEntity)
    private readonly jwksEntityRepository: JwksEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: JwksFindOneReqDto): Promise<JwksResDto | undefined> {
    return this.jwksEntityRepository.findOne({
      id: dto.id,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async getOneRandom(
    _dto: JwksGetOneRandomReqDto
  ): Promise<JwksResDto | undefined> {
    return this.jwksEntityRepository.getOneRandom();
  }
}
