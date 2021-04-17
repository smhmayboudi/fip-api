import { Controller, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from "@nestjs/terminus";

import { APP_PATH_HEALTH } from "@fip/common";
import { AppHealthIndicator } from "./app.health.indicator";
import { AtHealthIndicator } from "../at/at.health.indicator";
import { AuthHealthIndicator } from "../auth/auth.health.indicator";
import { JwksHealthIndicator } from "../jwks/jwks.health.indicator";
import { PATH_METADATA } from "@nestjs/common/constants";
import { RtHealthIndicator } from "../rt/rt.health.indicator";
import { UserHealthIndicator } from "../user/user.health.indicator";

@Controller()
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class AppHealthController {
  constructor(
    private readonly appHealthIndicator: AppHealthIndicator,
    private readonly atHealthIndicator: AtHealthIndicator,
    private readonly authHealthIndicator: AuthHealthIndicator,
    private readonly healthCheckService: HealthCheckService,
    private readonly jwksHealthIndicator: JwksHealthIndicator,
    private readonly rtHealthIndicator: RtHealthIndicator,
    private readonly userHealthIndicator: UserHealthIndicator
  ) {
    Reflect.defineMetadata(PATH_METADATA, APP_PATH_HEALTH, AppHealthController);
  }

  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> =>
        this.appHealthIndicator.isHealthy(),
      async (): Promise<HealthIndicatorResult> =>
        this.atHealthIndicator.isHealthy(),
      async (): Promise<HealthIndicatorResult> =>
        this.authHealthIndicator.isHealthy(),
      async (): Promise<HealthIndicatorResult> =>
        this.jwksHealthIndicator.isHealthy(),
      async (): Promise<HealthIndicatorResult> =>
        this.rtHealthIndicator.isHealthy(),
      async (): Promise<HealthIndicatorResult> =>
        this.userHealthIndicator.isHealthy(),
    ]);
  }
}
