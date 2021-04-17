import { Counter, Gauge, Histogram, Summary } from "prom-client";
import {
  InjectCounter,
  InjectGauge,
  InjectHistogram,
  InjectSummary,
} from "./prom.decorator";
import {
  getTokenCounter,
  getTokenGauge,
  getTokenHistogram,
  getTokenSummary,
} from "./prom.util";
import { SELF_DECLARED_DEPS_METADATA } from "@nestjs/common/constants";

describe("PromDecorator", () => {
  const tokenCounter = "counter";
  const tokenGauge = "gauge";
  const tokenHistogram = "histogram";
  const tokenSummary = "summary";

  class Test {
    constructor(
      @InjectCounter(tokenCounter)
      private readonly counter: Counter<string>,
      @InjectGauge(tokenGauge)
      private readonly gauge: Gauge<string>,
      @InjectHistogram(tokenHistogram)
      private readonly histogram: Histogram<string>,
      @InjectSummary(tokenSummary)
      private readonly summary: Summary<string>
    ) {
      this.counter.inc();
      this.gauge.inc();
      this.histogram.observe(0);
      this.summary.observe(0);
    }
  }

  it("injectCounter enhance component with counter", () => {
    expect.hasAssertions();
    const metadata = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, Test);
    const key = Object.keys(metadata)[3];
    expect(metadata[key]).toStrictEqual({
      index: 0,
      param: getTokenCounter(tokenCounter),
    });
  });

  it("injectGauge enhance component with gauge", () => {
    expect.hasAssertions();
    const metadata = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, Test);
    const key = Object.keys(metadata)[2];
    expect(metadata[key]).toStrictEqual({
      index: 1,
      param: getTokenGauge(tokenGauge),
    });
  });

  it("injectHistogram enhance component with summery", () => {
    expect.hasAssertions();
    const metadata = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, Test);
    const key = Object.keys(metadata)[1];
    expect(metadata[key]).toStrictEqual({
      index: 2,
      param: getTokenHistogram(tokenHistogram),
    });
  });

  it("injectSummery enhance component with summery", () => {
    expect.hasAssertions();
    const metadata = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, Test);
    const key = Object.keys(metadata)[0];
    expect(metadata[key]).toStrictEqual({
      index: 3,
      param: getTokenSummary(tokenSummary),
    });
  });

  it.todo("PromInstanceCounter enhance instance with counter");
  it.todo("PromMethodCounter enhance method with counter");
});
