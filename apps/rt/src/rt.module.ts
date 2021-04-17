import { HttpModule, Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { RtConfigService } from "./rt.config.service";
import { RtController } from "./rt.controller";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtEventsGateway } from "./rt.events.gateway";
import { RtService } from "./rt.service";
import { RtTypeOrmOptionsFactory } from "./rt.type-orm.options.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./rt.config";

@Module({
  controllers: [RtController],
  exports: [RtConfigService, RtService],
  imports: [
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RtEntityRepository]),
    TypeOrmModule.forRootAsync({
      imports: [RtModule],
      useClass: RtTypeOrmOptionsFactory,
    }),
    HttpModule,
  ],
  providers: [RtConfigService, RtEventsGateway, RtService],
})
export class RtModule {}
