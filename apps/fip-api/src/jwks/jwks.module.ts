import {
  CommonClientKafka,
  JWKS,
  JWKS_FIND_ONE,
  JWKS_GET_ONE_RANDOM,
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
// import { JwksCacheOptionsFactory } from "./jwks.cache.options.factory";
import { JwksClientsOptionsFactory } from "./jwks.clients.options.factory";
import { JwksConfigService } from "./jwks.config.service";
import { JwksHealthIndicator } from "./jwks.health.indicator";
import { JwksService } from "./jwks.service";
import config from "./jwks.config";

@Module({
  exports: [JwksConfigService, JwksHealthIndicator, JwksService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   imports: [JwksModule],
    //   useClass: JwksCacheOptionsFactory,
    // }),
    ClientsModule.registerAsync([
      {
        imports: [JwksModule, HttpModule],
        name: JWKS,
        useClass: JwksClientsOptionsFactory,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [JwksConfigService, JwksHealthIndicator, JwksService],
})
export class JwksModule implements OnModuleInit {
  constructor(
    @Inject(JWKS) private readonly jwksClientKafka: CommonClientKafka
  ) {}

  async onModuleInit(): Promise<void> {
    this.jwksClientKafka.subscribeToResponseOf(JWKS_FIND_ONE);
    this.jwksClientKafka.subscribeToResponseOf(JWKS_GET_ONE_RANDOM);
    await this.jwksClientKafka.connect();
  }
}
