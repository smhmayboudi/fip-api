import { AppUser } from "./app.user.decorator";
import { ExecutionContext } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";

describe("AppUser", () => {
  // TODO: interface ?
  const httpArgumentsHostPartial = {
    getNext: jest.fn(),
    getResponse: jest.fn(),
  };
  // TODO: interface ?
  const executionContextPartial = {
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
    getType: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
  };

  it("should be defined", () => {
    expect.hasAssertions();
    expect(AppUser()).toBeDefined();
  });

  it("shoud be equal to a value data undefined", () => {
    expect.hasAssertions();
    const httpArgumentsHost: HttpArgumentsHost = {
      ...httpArgumentsHostPartial,
      getRequest: jest.fn().mockImplementation(() => ({
        user: {
          sub: "0",
        },
      })),
    };
    const executionContext: ExecutionContext = {
      ...executionContextPartial,
      switchToHttp: () => httpArgumentsHost,
    };
    class Test {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      test(@AppUser() _sub: number): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory(undefined, executionContext)).toStrictEqual({
      sub: "0",
    });
  });

  it("shoud throw an error with user undefined", () => {
    expect.hasAssertions();
    const httpArgumentsHost: HttpArgumentsHost = {
      ...httpArgumentsHostPartial,
      getRequest: jest.fn().mockImplementation(() => ({})),
    };
    const executionContext: ExecutionContext = {
      ...executionContextPartial,
      switchToHttp: () => httpArgumentsHost,
    };
    class Test {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      test(@AppUser("sub") _sub: number): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(() => metadata[key].factory("sub", executionContext)).toThrow("");
  });

  it("shoud be equal to a value", () => {
    expect.hasAssertions();
    const httpArgumentsHost: HttpArgumentsHost = {
      ...httpArgumentsHostPartial,
      getRequest: jest.fn().mockImplementation(() => ({
        user: {
          sub: "0",
        },
      })),
    };
    const executionContext: ExecutionContext = {
      ...executionContextPartial,
      switchToHttp: () => httpArgumentsHost,
    };
    class Test {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      test(@AppUser("sub") _sub: number): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory("sub", executionContext)).toStrictEqual("0");
  });
});
