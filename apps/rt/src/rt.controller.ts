import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
import {
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor,
  CommonKafkaValuePipe,
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
import { MessagePattern, Payload } from "@nestjs/microservices";

import { RtService } from "./rt.service";

@UseInterceptors(
  ClassSerializerInterceptor,
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor
)
@Controller()
export class RtController {
  constructor(private readonly rtService: RtService) {}

  @MessagePattern(RT_BLOCK)
  block(
    @Payload(CommonKafkaValuePipe) dto: RtBlockReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.block(dto);
  }

  @MessagePattern(RT_BLOCK_BY_TOKEN)
  blockByToken(
    @Payload(CommonKafkaValuePipe) dto: RtBlockByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.blockByToken(dto);
  }

  @MessagePattern(RT_DELETE)
  delete(
    @Payload(CommonKafkaValuePipe) dto: RtDeleteReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.delete(dto);
  }

  @MessagePattern(RT_DELETE_BY_TOKEN)
  deleteByToken(
    @Payload(CommonKafkaValuePipe) dto: RtDeleteByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.deleteByToken(dto);
  }

  @MessagePattern(RT_FIND)
  find(dto: RtFindReqDto): Promise<RtResDto[]> {
    return this.rtService.find(dto);
  }

  @MessagePattern(RT_FIND_ONE)
  findOne(
    @Payload(CommonKafkaValuePipe) dto: RtFindOneReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.findOne(dto);
  }

  @MessagePattern(RT_FIND_ONE_BY_TOKEN)
  findOneByToken(
    @Payload(CommonKafkaValuePipe) dto: RtFindOneByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.findOneByToken(dto);
  }

  @MessagePattern(RT_SAVE)
  save(@Payload(CommonKafkaValuePipe) dto: RtSaveReqDto): Promise<RtResDto> {
    return this.rtService.save(dto);
  }

  @MessagePattern(RT_VALIDATE)
  validate(
    @Payload(CommonKafkaValuePipe) dto: RtValidateReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.validate(dto);
  }

  @MessagePattern(RT_VALIDATE_BY_TOKEN)
  validateByToken(
    @Payload(CommonKafkaValuePipe) dto: RtValidateByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.rtService.validateByToken(dto);
  }
}
