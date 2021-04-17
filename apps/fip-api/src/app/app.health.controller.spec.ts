import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from "@nestjs/terminus";

import { AppHealthController } from "./app.health.controller";
import { AppHealthIndicator } from "./app.health.indicator";
import { AppHealthIndicatorInterface } from "@fip/common";
import { AtHealthIndicator } from "../at/at.health.indicator";
import { AuthHealthIndicator } from "../auth/auth.health.indicator";
import { JwksHealthIndicator } from "../jwks/jwks.health.indicator";
import { RtHealthIndicator } from "../rt/rt.health.indicator";
import { Test } from "@nestjs/testing";
import { UserHealthIndicator } from "../user/user.health.indicator";

describe("AppHealthController", () => {
  const appHealthIndicatorResult: HealthIndicatorResult = {
    app: {
      status: "up",
    },
  };
  const atHealthIndicatorResult: HealthIndicatorResult = {
    at: {
      status: "up",
    },
  };
  const authHealthIndicatorResult: HealthIndicatorResult = {
    auth: {
      status: "up",
    },
  };
  const jwksHealthIndicatorResult: HealthIndicatorResult = {
    jwks: {
      status: "up",
    },
  };
  const rtHealthIndicatorResult: HealthIndicatorResult = {
    rt: {
      status: "up",
    },
  };
  const userHealthIndicatorResult: HealthIndicatorResult = {
    user: {
      status: "up",
    },
  };
  const healthCheckResult: HealthCheckResult = {
    details: {
      ...appHealthIndicatorResult,
      ...atHealthIndicatorResult,
      ...authHealthIndicatorResult,
      ...jwksHealthIndicatorResult,
      ...rtHealthIndicatorResult,
      ...userHealthIndicatorResult,
    },
    error: {},
    info: {
      ...appHealthIndicatorResult,
      ...atHealthIndicatorResult,
      ...authHealthIndicatorResult,
      ...jwksHealthIndicatorResult,
      ...rtHealthIndicatorResult,
      ...userHealthIndicatorResult,
    },
    status: "ok",
  };

  let controller: AppHealthController;

  const appHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(appHealthIndicatorResult),
  };
  const atHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(atHealthIndicatorResult),
  };
  const authHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(authHealthIndicatorResult),
  };
  const jwksHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(jwksHealthIndicatorResult),
  };
  const rtHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(rtHealthIndicatorResult),
  };
  const userHealthIndicatorMock: AppHealthIndicatorInterface = {
    isHealthy: () => Promise.resolve(userHealthIndicatorResult),
  };
  // TODO: interface ?
  const healthCheckServiceMock = {
    check: async (indicatorFunctions: any[]): Promise<HealthCheckResult> => {
      const indicator = (
        await Promise.all(
          indicatorFunctions.map(async (value) => await value())
        )
      ).reduceRight((previousValue, currentValue) => ({
        ...previousValue,
        ...currentValue,
      }));
      return Promise.resolve({
        details: indicator,
        error: {},
        info: indicator,
        status: "ok",
      });
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppHealthController],
      providers: [
        { provide: AppHealthIndicator, useValue: appHealthIndicatorMock },
        { provide: AtHealthIndicator, useValue: atHealthIndicatorMock },
        { provide: AuthHealthIndicator, useValue: authHealthIndicatorMock },
        { provide: HealthCheckService, useValue: healthCheckServiceMock },
        { provide: JwksHealthIndicator, useValue: jwksHealthIndicatorMock },
        { provide: RtHealthIndicator, useValue: rtHealthIndicatorMock },
        { provide: UserHealthIndicator, useValue: userHealthIndicatorMock },
      ],
    }).compile();
    controller = module.get<AppHealthController>(AppHealthController);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(controller).toBeDefined();
  });

  it("index should be called", async () => {
    expect.hasAssertions();
    expect(await controller.healthCheck()).toStrictEqual(healthCheckResult);
  });
});
