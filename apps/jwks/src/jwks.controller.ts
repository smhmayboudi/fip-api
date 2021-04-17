import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
import {
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor,
  CommonKafkaValuePipe,
  JWKS_FIND_ONE,
  JWKS_GET_ONE_RANDOM,
  JwksFindOneReqDto,
  JwksGetOneRandomReqDto,
  JwksResDto,
} from "@fip/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { JwksService } from "./jwks.service";

@UseInterceptors(
  ClassSerializerInterceptor,
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor
)
@Controller()
export class JwksController {
  constructor(private readonly jwksService: JwksService) {}

  @MessagePattern(JWKS_FIND_ONE)
  findOne(
    @Payload(CommonKafkaValuePipe)
    dto: JwksFindOneReqDto
  ): Promise<JwksResDto | undefined> {
    return this.jwksService.findOne(dto);
  }

  @MessagePattern(JWKS_GET_ONE_RANDOM)
  getOneRandom(dto: JwksGetOneRandomReqDto): Promise<JwksResDto | undefined> {
    return this.jwksService.getOneRandom(dto);
  }
}
