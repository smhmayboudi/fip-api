import {
  CallHandler,
  ExecutionContext,
  HttpArgumentsHost,
} from "@nestjs/common/interfaces";

import { CommonKafkaResFailureInterceptor } from "./common.kafka-res-failure.interceptor";
import { of } from "rxjs";

describe("CommonKafkaResFailureInterceptor", () => {
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
    expect(new CommonKafkaResFailureInterceptor()).toBeDefined();
  });

  it("intercept should be called", () => {
    new CommonKafkaResFailureInterceptor()
      .intercept(executionContext, callHandler)
      .subscribe();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(httpArgumentsHost.getRequest).toHaveBeenCalled();
  });

  it.todo("intercept should be called with exception");
});
