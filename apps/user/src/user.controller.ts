import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
import {
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor,
  CommonKafkaValuePipe,
  USER_FIND,
  USER_FIND_BY_TELEGRAM_ID,
  USER_FIND_BY_USERNAME,
  USER_FIND_ONE,
  USER_GET,
  USER_PUT,
  USER_SAVE,
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserFindReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@fip/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserService } from "./user.service";

@UseInterceptors(
  ClassSerializerInterceptor,
  CommonKafkaResFailureInterceptor,
  CommonKafkaResSuccessInterceptor
)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(USER_PUT)
  edit(
    @Payload(CommonKafkaValuePipe) dto: UserEditReqDto
  ): Promise<UserResDto> {
    return this.userService.edit(dto);
  }

  @MessagePattern(USER_FIND)
  find(dto: UserFindReqDto): Promise<UserResDto[]> {
    return this.userService.find(dto);
  }

  @MessagePattern(USER_FIND_ONE)
  findOne(
    @Payload(CommonKafkaValuePipe) dto: UserFindOneReqDto
  ): Promise<UserResDto | undefined> {
    return this.userService.findOne(dto);
  }

  @MessagePattern(USER_FIND_BY_TELEGRAM_ID)
  findOneByTelegramId(
    @Payload(CommonKafkaValuePipe) dto: UserFindOneByTelegramIdReqDto
  ): Promise<UserResDto | undefined> {
    return this.userService.findOneByTelegramId(dto);
  }

  @MessagePattern(USER_FIND_BY_USERNAME)
  findOneByUsername(
    @Payload(CommonKafkaValuePipe) dto: UserFindOneByUsernameReqDto
  ): Promise<UserResDto | undefined> {
    return this.userService.findOneByUsername(dto);
  }

  @MessagePattern(USER_GET)
  get(
    @Payload(CommonKafkaValuePipe) dto: UserGetReqDto
  ): Promise<UserResDto | undefined> {
    return this.userService.get(dto);
  }

  @MessagePattern(USER_SAVE)
  save(
    @Payload(CommonKafkaValuePipe) dto: UserSaveReqDto
  ): Promise<UserResDto> {
    return this.userService.save(dto);
  }
}
