// import { ApmModule } from "@fip/apm";
// import { AppApmOptionsFactory } from "./app.apm.options.factory";
// import { AppCacheOptionsFactory } from "./app.cache.options.factory";
import { AppConfigService } from "./app.config.service";
import { AppEventsGateway } from "./app.events.gateway";
import { AppHashIdService } from "./app.hash-id.service";
// import { AppHealthController } from "./app.health.controller";
// import { AppHealthIndicator } from "./app.health.indicator";
import { AppPromOptionsFactory } from "./app.prom.options.factory";
import { AppSentryOptionsFactory } from "./app.sentry.options.factory";
import { AppService } from "./app.service";
import { AtModule } from "../at/at.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { JwksModule } from "../jwks/jwks.module";
import { Module } from "@nestjs/common";
import { PromModule } from "@fip/prom";
import { RtModule } from "../rt/rt.module";
import { SentryModule } from "@fip/sentry";
import { TerminusModule } from "@nestjs/terminus";
import { UserModule } from "../user/user.module";
import config from "./app.config";

@Module({
  // controllers: [AppHealthController],
  exports: [
    AppConfigService,
    AppHashIdService,
    // AppHealthIndicator,
    AppService,
  ],
  imports: [
    // ApmModule.forRootAsync({
    //   imports: [AppModule],
    //   useClass: AppApmOptionsFactory,
    // }),
    AtModule,
    AuthModule,
    // CacheModule.registerAsync({
    //   imports: [AppModule],
    //   useClass: AppCacheOptionsFactory,
    // }),
    ConfigModule.forFeature(config),
    ConfigModule.forRoot(),
    JwksModule,
    PromModule.forRootAsync({
      imports: [AppModule],
      useClass: AppPromOptionsFactory,
    }),
    RtModule,
    SentryModule.forRootAsync({
      imports: [AppModule],
      useClass: AppSentryOptionsFactory,
    }),
    TerminusModule,
    UserModule,
  ],
  providers: [
    AppConfigService,
    AppEventsGateway,
    AppHashIdService,
    // AppHealthIndicator,
    AppService,
  ],
})
export class AppModule {}
