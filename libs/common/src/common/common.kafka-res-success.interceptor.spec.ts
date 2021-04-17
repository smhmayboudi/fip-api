import {
  CallHandler,
  ExecutionContext,
  HttpArgumentsHost,
} from "@nestjs/common/interfaces";

import { CommonKafkaResSuccessInterceptor } from "./common.kafka-res-success.interceptor";
import { of } from "rxjs";

describe("CommonKafkaResSuccessInterceptor", () => {
  const callHandler: CallHandler = {
    handle: jest.fn(() => of(undefined)),
  };
  const httpArgumentsHost: HttpArgumentsHost = {
    getNext: jest.fn(),
    getRequest: jest.fn().mockImplementation(() => ({
      path: "",
      user: {
        sub: "0",
      },
    })),
    getResponse: jest.fn(),
  };
  const executionContext: ExecutionContext = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToHttp: () => httpArgumentsHost,
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new CommonKafkaResSuccessInterceptor()).toBeDefined();
  });

  it("intercept should be called", () => {
    expect.hasAssertions();
    new CommonKafkaResSuccessInterceptor()
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalledWith();
  });

  it.todo("intercept should be called with exception");
});
