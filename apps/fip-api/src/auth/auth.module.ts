import { AnonymUUIDStrategy } from "./anonym-uuid.strategy";
import { AtModule } from "../at/at.module";
import { AuthAuthOptionsFactory } from "./auth.options.factory";
import { AuthConfigService } from "./auth.config.service";
import { AuthController } from "./auth.controller";
import { AuthHealthIndicator } from "./auth.health.indicator";
import { AuthJwtOptionsFactory } from "./auth.jwt.options.factory";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { JwksModule } from "../jwks/jwks.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { RtModule } from "../rt/rt.module";
import { TelegramStrategy } from "./telegram.strategy";
import { TokenStrategy } from "./token.strategy";
import { UserModule } from "../user/user.module";
import config from "./auth.config";

@Module({
  controllers: [AuthController],
  exports: [AuthConfigService, AuthHealthIndicator, AuthService],
  imports: [
    AtModule,
    ConfigModule.forFeature(config),
    JwksModule,
    JwtModule.registerAsync({
      imports: [AuthModule],
      useClass: AuthJwtOptionsFactory,
    }),
    PassportModule.registerAsync({
      imports: [AuthModule],
      useClass: AuthAuthOptionsFactory,
    }),
    RtModule,
    UserModule,
  ],
  providers: [
    AnonymUUIDStrategy,
    AuthConfigService,
    AuthHealthIndicator,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    TelegramStrategy,
    TokenStrategy,
  ],
})
export class AuthModule {}
