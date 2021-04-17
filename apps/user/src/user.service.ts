import { ApmAfterMethod, ApmBeforeMethod } from "@fip/apm";
import {
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserFindReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@fip/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@fip/prom";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
import { UserServiceInterface } from "./user.service.interface";

@Injectable()
// @PromInstanceCounter
export class UserService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async edit(dto: UserEditReqDto): Promise<UserResDto> {
    return this.userEntityRepository.save(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(_dto: UserFindReqDto): Promise<UserResDto[]> {
    return this.userEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: UserFindOneReqDto): Promise<UserResDto | undefined> {
    return this.userEntityRepository.findOne({
      id: dto.id,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByTelegramId(
    dto: UserFindOneByTelegramIdReqDto
  ): Promise<UserResDto | undefined> {
    return this.userEntityRepository.findOne({
      telegramId: dto.telegramId,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByUsername(
    dto: UserFindOneByUsernameReqDto
  ): Promise<UserResDto | undefined> {
    return this.userEntityRepository.findOne({
      username: dto.username,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: UserGetReqDto): Promise<UserResDto | undefined> {
    return this.findOne({
      id: dto.id,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: UserSaveReqDto): Promise<UserResDto> {
    return this.userEntityRepository.save(dto);
  }
}
