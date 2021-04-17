import { HttpModule, Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { JwksConfigService } from "./jwks.config.service";
import { JwksController } from "./jwks.controller";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksEventsGateway } from "./jwks.events.gateway";
import { JwksService } from "./jwks.service";
import { JwksTypeOrmOptionsFactory } from "./jwks.type-orm.options.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./jwks.config";

@Module({
  controllers: [JwksController],
  exports: [JwksConfigService, JwksService],
  imports: [
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([JwksEntityRepository]),
    TypeOrmModule.forRootAsync({
      imports: [JwksModule],
      useClass: JwksTypeOrmOptionsFactory,
    }),
    HttpModule,
  ],
  providers: [JwksConfigService, JwksEventsGateway, JwksService],
})
export class JwksModule {}
