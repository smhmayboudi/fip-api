import {
  AT,
  AT_DELETE,
  AT_DELETE_BY_TOKEN,
  AT_FIND,
  AT_FIND_ONE,
  AT_FIND_ONE_BY_TOKEN,
  AT_SAVE,
  AT_UPDATE,
  AT_VALIDATE,
  AT_VALIDATE_BY_TOKEN,
  CommonClientKafka,
} from "@fip/common";
import {
  HttpModule,
  Inject,
  Module,
  OnModuleInit,
  forwardRef,
} from "@nestjs/common";

import { AppModule } from "../app/app.module";
// import { AtCacheOptionsFactory } from "./at.cache.options.factory";
import { AtClientsOptionsFactory } from "./at.clients.options.factory";
import { AtConfigService } from "./at.config.service";
import { AtHealthIndicator } from "./at.health.indicator";
import { AtService } from "./at.service";
import { ClientsModule } from "@nestjs/microservices";
import { ConfigModule } from "@nestjs/config";
import config from "./at.config";

@Module({
  exports: [AtConfigService, AtHealthIndicator, AtService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   imports: [AtModule],
    //   useClass: AtCacheOptionsFactory,
    // }),
    ClientsModule.registerAsync([
      {
        imports: [AtModule, HttpModule],
        name: AT,
        useClass: AtClientsOptionsFactory,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [AtConfigService, AtHealthIndicator, AtService],
})
export class AtModule implements OnModuleInit {
  constructor(@Inject(AT) private readonly atClientKafka: CommonClientKafka) {}

  async onModuleInit(): Promise<void> {
    this.atClientKafka.subscribeToResponseOf(AT_DELETE);
    this.atClientKafka.subscribeToResponseOf(AT_DELETE_BY_TOKEN);
    this.atClientKafka.subscribeToResponseOf(AT_FIND);
    this.atClientKafka.subscribeToResponseOf(AT_FIND_ONE);
    this.atClientKafka.subscribeToResponseOf(AT_FIND_ONE_BY_TOKEN);
    this.atClientKafka.subscribeToResponseOf(AT_SAVE);
    this.atClientKafka.subscribeToResponseOf(AT_UPDATE);
    this.atClientKafka.subscribeToResponseOf(AT_VALIDATE);
    this.atClientKafka.subscribeToResponseOf(AT_VALIDATE_BY_TOKEN);
    await this.atClientKafka.connect();
  }
}
