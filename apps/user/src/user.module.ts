import { HttpModule, Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserEventsGateway } from "./user.events.gateway";
import { UserService } from "./user.service";
import { UserTypeOrmOptionsFactory } from "./user.type-orm.options.factory";
import config from "./user.config";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserService],
  imports: [
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntityRepository]),
    TypeOrmModule.forRootAsync({
      imports: [UserModule],
      useClass: UserTypeOrmOptionsFactory,
    }),
    HttpModule,
  ],
  providers: [UserConfigService, UserEventsGateway, UserService],
})
export class UserModule {}
