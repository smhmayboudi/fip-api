import { ApmAfterMethod, ApmBeforeMethod } from "@fip/apm";
import {
  CommonClientKafka,
  CommonKafkaReqDto,
  CommonKafkaValueResDto,
  USER,
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
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { PromMethodCounter } from "@fip/prom";
import { UserServiceInterface } from "./user.service.interface";

@Injectable()
// @PromInstanceCounter
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER) private readonly userClientKafka: CommonClientKafka
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async edit(
    dto: UserEditReqDto,
    sub: number
  ): Promise<UserResDto | undefined> {
    const user = await this.userClientKafka
      .send<
        CommonKafkaValueResDto<UserResDto, UserEditReqDto>,
        CommonKafkaReqDto<UserEditReqDto>
      >(USER_PUT, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (user.err !== undefined) {
      throw new InternalServerErrorException(user.err);
    }
    return user.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(
    dto: UserFindReqDto,
    sub: number
  ): Promise<UserResDto[] | undefined> {
    const user = await this.userClientKafka
      .send<
        CommonKafkaValueResDto<UserResDto[], UserFindReqDto>,
        CommonKafkaReqDto<UserFindReqDto>
      >(USER_FIND, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (user.err !== undefined) {
      throw new InternalServerErrorException(user.err);
    }
    return user.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(
    dto: UserFindOneReqDto,
    sub: number
  ): Promise<UserResDto | undefined> {
    const user = await this.userClientKafka
      .send<
        CommonKafkaValueResDto<UserResDto, UserFindOneReqDto>,
        CommonKafkaReqDto<UserFindOneReqDto>
      >(USER_FIND_ONE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (user.err !== undefined) {
      throw new InternalServerErrorException(user.err);
    }
    return user.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByTelegramId(
    dto: UserFindOneByTelegramIdReqDto,
    sub: number
  ): Promise<UserResDto | undefined> {
    const user = await this.userClientKafka
      .send<
        CommonKafkaValueResDto<UserResDto, UserFindOneByTelegramIdReqDto>,
        CommonKafkaReqDto<UserFindOneByTelegramIdReqDto>
      >(USER_FIND_BY_TELEGRAM_ID, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (user.err !== undefined) {
      throw new InternalServerErrorException(user.err);
    }
    return user.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByUsername(
    dto: UserFindOneByUsernameReqDto,
    sub: number
  ): Promise<UserResDto | undefined> {
    const user = await this.userClientKafka
      .send<
        CommonKafkaValueResDto<UserResDto, UserFindOneByUsernameReqDto>,
        CommonKafkaReqDto<UserFindOneByUsernameReqDto>
      >(USER_FIND_BY_USERNAME, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (user.err !== undefined) {
      throw new InternalServerErrorException(user.err);
    }
    return user.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: UserGetReqDto, sub: number): Promise<UserResDto | undefined> {
    const user = await this.userClientKafka
      .send<
        CommonKafkaValueResDto<UserResDto, UserGetReqDto>,
        CommonKafkaReqDto<UserGetReqDto>
      >(USER_GET, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (user.err !== undefined) {
      throw new InternalServerErrorException(user.err);
    }
    return user.res;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(
    dto: UserSaveReqDto,
    sub: number
  ): Promise<UserResDto | undefined> {
    const user = await this.userClientKafka
      .send<
        CommonKafkaValueResDto<UserResDto, UserSaveReqDto>,
        CommonKafkaReqDto<UserSaveReqDto>
      >(USER_SAVE, {
        key: sub,
        value: dto,
      })
      .toPromise();
    if (user.err !== undefined) {
      throw new InternalServerErrorException(user.err);
    }
    return user.res;
  }
}
