import {
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
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor,
  CommonKafkaValuePipe,
} from "@fip/common";
import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AtService } from "./at.service";

@UseInterceptors(
  ClassSerializerInterceptor,
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor
)
@Controller()
export class AtController {
  constructor(private readonly atService: AtService) {}

  @MessagePattern(AT_DELETE)
  delete(
    @Payload(CommonKafkaValuePipe) dto: AtDeleteReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.delete(dto);
  }

  @MessagePattern(AT_DELETE_BY_TOKEN)
  deleteByToken(
    @Payload(CommonKafkaValuePipe) dto: AtDeleteByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.deleteByToken(dto);
  }

  @MessagePattern(AT_FIND)
  find(dto: AtFindReqDto): Promise<AtResDto[]> {
    return this.atService.find(dto);
  }

  @MessagePattern(AT_FIND_ONE)
  findOne(
    @Payload(CommonKafkaValuePipe) dto: AtFindOneReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.findOne(dto);
  }

  @MessagePattern(AT_FIND_ONE_BY_TOKEN)
  findOneByToken(
    @Payload(CommonKafkaValuePipe) dto: AtFindOneByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.findOneByToken(dto);
  }

  @MessagePattern(AT_SAVE)
  save(@Payload(CommonKafkaValuePipe) dto: AtSaveReqDto): Promise<AtResDto> {
    return this.atService.save(dto);
  }

  @MessagePattern(AT_UPDATE)
  update(
    @Payload(CommonKafkaValuePipe) dto: AtUpdateReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.update(dto);
  }

  @MessagePattern(AT_VALIDATE)
  validate(
    @Payload(CommonKafkaValuePipe) dto: AtValidateReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.validate(dto);
  }

  @MessagePattern(AT_VALIDATE_BY_TOKEN)
  validateByToken(
    @Payload(CommonKafkaValuePipe) dto: AtValidateByTokenReqDto
  ): Promise<AtResDto | undefined> {
    return this.atService.validateByToken(dto);
  }
}
