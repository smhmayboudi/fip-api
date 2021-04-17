import { HttpModule, Module } from "@nestjs/common";

import { AtConfigService } from "./at.config.service";
import { AtController } from "./at.controller";
import { AtEntityRepository } from "./at.entity.repository";
import { AtEventsGateway } from "./at.events.gateway";
import { AtService } from "./at.service";
import { AtTypeOrmOptionsFactory } from "./at.type-orm.options.factory";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./at.config";

@Module({
  controllers: [AtController],
  exports: [AtConfigService, AtService],
  imports: [
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([AtEntityRepository]),
    TypeOrmModule.forRootAsync({
      imports: [AtModule],
      useClass: AtTypeOrmOptionsFactory,
    }),
    HttpModule,
  ],
  providers: [AtConfigService, AtEventsGateway, AtService],
})
export class AtModule {}
