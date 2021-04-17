import {
  CommonClientKafka,
  RT,
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
} from "@fip/common";
import {
  HttpModule,
  Inject,
  Module,
  OnModuleInit,
  forwardRef,
} from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ClientsModule } from "@nestjs/microservices";
import { ConfigModule } from "@nestjs/config";
// import { RtCacheOptionsFactory } from "./rt.cache.options.factory";
import { RtClientsOptionsFactory } from "./rt.clients.options.factory";
import { RtConfigService } from "./rt.config.service";
import { RtHealthIndicator } from "./rt.health.indicator";
import { RtService } from "./rt.service";
import config from "./rt.config";

@Module({
  exports: [RtConfigService, RtHealthIndicator, RtService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   imports: [RtModule],
    //   useClass: RtCacheOptionsFactory,
    // }),
    ClientsModule.registerAsync([
      {
        imports: [HttpModule, RtModule],
        name: RT,
        useClass: RtClientsOptionsFactory,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [RtConfigService, RtHealthIndicator, RtService],
})
export class RtModule implements OnModuleInit {
  constructor(@Inject(RT) private readonly rtClientKafka: CommonClientKafka) {}

  async onModuleInit(): Promise<void> {
    this.rtClientKafka.subscribeToResponseOf(RT_BLOCK);
    this.rtClientKafka.subscribeToResponseOf(RT_BLOCK_BY_TOKEN);
    this.rtClientKafka.subscribeToResponseOf(RT_DELETE);
    this.rtClientKafka.subscribeToResponseOf(RT_DELETE_BY_TOKEN);
    this.rtClientKafka.subscribeToResponseOf(RT_FIND);
    this.rtClientKafka.subscribeToResponseOf(RT_FIND_ONE);
    this.rtClientKafka.subscribeToResponseOf(RT_FIND_ONE_BY_TOKEN);
    this.rtClientKafka.subscribeToResponseOf(RT_SAVE);
    this.rtClientKafka.subscribeToResponseOf(RT_VALIDATE);
    this.rtClientKafka.subscribeToResponseOf(RT_VALIDATE_BY_TOKEN);
    await this.rtClientKafka.connect();
  }
}
