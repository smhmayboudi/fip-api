import {
  ApmCurrentSpan,
  ApmCurrentTraceparent,
  ApmCurrentTransaction,
} from "./apm.decorator";
import { Span, Transaction } from "./apm.module.interface";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";

describe("ApmDecorator", () => {
  it("apmCurrentSpan enhance component with apm current span", () => {
    expect.hasAssertions();
    class Test {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      test(@ApmCurrentSpan() _span: Span | null): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory()).toBeNull();
  });

  it("apmCurrentTraceparent enhance component with apm current traceparent", () => {
    expect.hasAssertions();
    class Test {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      test(@ApmCurrentTraceparent() _traceparent: string): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory()).toBeNull();
  });

  it("apmCurrentTransaction enhance component with apm current transaction", () => {
    expect.hasAssertions();
    class Test {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      test(@ApmCurrentTransaction() _transaction: Transaction): void {}
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory()).toBeNull();
  });

  it.todo("ApmAfterMethod enhance instance with apm");
  it.todo("ApmBeforeMethod enhance method with apm");
});
