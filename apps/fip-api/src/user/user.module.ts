import {
  CommonClientKafka,
  USER,
  USER_FIND,
  USER_FIND_BY_TELEGRAM_ID,
  USER_FIND_BY_USERNAME,
  USER_FIND_ONE,
  USER_GET,
  USER_PUT,
  USER_SAVE,
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
// import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import { UserClientsOptionsFactory } from "./user.clients.options.factory";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserHealthIndicator } from "./user.health.indicator";
import { UserService } from "./user.service";
import config from "./user.config";

@Module({
  controllers: [UserController],
  exports: [UserConfigService, UserHealthIndicator, UserService],
  imports: [
    forwardRef(() => AppModule),
    // CacheModule.registerAsync({
    //   imports: [UserModule],
    //   useClass: UserCacheOptionsFactory,
    // }),
    ClientsModule.registerAsync([
      {
        imports: [HttpModule, UserModule],
        name: USER,
        useClass: UserClientsOptionsFactory,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [UserConfigService, UserHealthIndicator, UserService],
})
export class UserModule implements OnModuleInit {
  constructor(
    @Inject(USER) private readonly userClientKafka: CommonClientKafka
  ) {}

  async onModuleInit(): Promise<void> {
    this.userClientKafka.subscribeToResponseOf(USER_FIND);
    this.userClientKafka.subscribeToResponseOf(USER_FIND_BY_TELEGRAM_ID);
    this.userClientKafka.subscribeToResponseOf(USER_FIND_BY_USERNAME);
    this.userClientKafka.subscribeToResponseOf(USER_FIND_ONE);
    this.userClientKafka.subscribeToResponseOf(USER_GET);
    this.userClientKafka.subscribeToResponseOf(USER_PUT);
    this.userClientKafka.subscribeToResponseOf(USER_SAVE);
    await this.userClientKafka.connect();
  }
}
