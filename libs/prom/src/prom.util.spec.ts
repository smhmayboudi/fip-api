import { Counter, Gauge, Histogram, Registry, Summary } from "prom-client";
import {
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  getOrCreateSummary,
  getTokenConfiguration,
  getTokenCounter,
  getTokenGauge,
  getTokenHistogram,
  getTokenRegistry,
  getTokenSummary,
  makeDefaultOptions,
  promConfigurationProviderImp,
  promRegistryProviderImp,
} from "./prom.util";

describe("PromUtil", () => {
  it("getOrCreateCounter should be instance of a counter metric", () => {
    expect.hasAssertions();
    expect(
      getOrCreateCounter({
        help: "counter",
        name: "counter",
      })
    ).toBeInstanceOf(Counter);
  });

  it("getOrCreateCounter should be instance of same counter metric", () => {
    expect.hasAssertions();
    expect(
      getOrCreateCounter({
        help: "counter",
        name: "counter",
      })
    ).toBeInstanceOf(Counter);
  });

  it("getOrCreateGauge should be instance of a gauge metric", () => {
    expect.hasAssertions();
    expect(
      getOrCreateGauge({
        help: "gauge",
        name: "gauge",
      })
    ).toBeInstanceOf(Gauge);
  });

  it("getOrCreateHistogram should be instance of a histogram metric", () => {
    expect.hasAssertions();
    expect(
      getOrCreateHistogram({
        help: "histogram",
        name: "histogram",
      })
    ).toBeInstanceOf(Histogram);
  });

  it("getOrCreateSummary should be instance of a summary metric", () => {
    expect.hasAssertions();
    expect(
      getOrCreateSummary({
        help: "summary",
        name: "summary",
      })
    ).toBeInstanceOf(Summary);
  });

  it("getTokenCounter should be equal to a string", () => {
    expect.hasAssertions();
    expect(getTokenCounter("test")).toStrictEqual("PROM_COUNTER_TEST");
  });

  it("getTokenGauge should be equal to a string", () => {
    expect.hasAssertions();
    expect(getTokenGauge("test")).toStrictEqual("PROM_GAUGE_TEST");
  });

  it("getTokenHistogram should be equal to a string", () => {
    expect.hasAssertions();
    expect(getTokenHistogram("test")).toStrictEqual("PROM_HISTOGRAM_TEST");
  });

  it("getTokenSummary should be equal to a string", () => {
    expect.hasAssertions();
    expect(getTokenSummary("test")).toStrictEqual("PROM_SUMMARY_TEST");
  });

  it("getTokenConfiguration should be equal to a string", () => {
    expect.hasAssertions();
    expect(getTokenConfiguration()).toStrictEqual("PROM_CONFIGURATION_DEFAULT");
  });

  it("getTokenConfiguration should be equal to a string with name", () => {
    expect.hasAssertions();
    expect(getTokenConfiguration("TEST")).toStrictEqual(
      "PROM_CONFIGURATION_TEST"
    );
  });

  it("getTokenRegistry should be equal to a string", () => {
    expect.hasAssertions();
    expect(getTokenRegistry()).toStrictEqual("PROM_REGISTRY_DEFAULT");
  });

  it("getTokenRegistry should be equal to a string with name", () => {
    expect.hasAssertions();
    expect(getTokenRegistry("TEST")).toStrictEqual("PROM_REGISTRY_TEST");
  });

  it("makeDefaultOptions should be equal to an option", () => {
    expect.hasAssertions();
    expect(makeDefaultOptions()).toStrictEqual({
      defaultLabels: {},
      defaultMetrics: {
        config: {},
        enabled: true,
      },
      ignorePaths: ["/metrics"],
      path: "/metrics",
      prefix: "",
      registryName: undefined,
    });
  });

  it("makeDefaultOptions should be equal to an option with custom", () => {
    expect.hasAssertions();
    expect(
      makeDefaultOptions({
        defaultLabels: {
          "": "",
        },
        defaultMetrics: {
          config: {
            eventLoopMonitoringPrecision: 1,
          },
          enabled: false,
        },
        ignorePaths: [],
        path: "",
        prefix: "test",
        registryName: "test",
      })
    ).toStrictEqual({
      defaultLabels: {
        "": "",
      },
      defaultMetrics: {
        config: {
          eventLoopMonitoringPrecision: 1,
        },
        enabled: false,
      },
      ignorePaths: ["/metrics"],
      path: "",
      prefix: "test",
      registryName: "test",
    });
  });

  it("promConfigurationProviderImp should be undefined", () => {
    expect.hasAssertions();
    expect(promConfigurationProviderImp({}, "")).toBeUndefined();
  });

  it("promConfigurationProviderImp should be undefined with promConfigurationName", () => {
    expect.hasAssertions();
    expect(
      promConfigurationProviderImp({}, "PROM_CONFIGURATION_DEFAULT")
    ).toBeUndefined();
  });

  it("promRegistryProviderImp should be instance of registry", () => {
    expect.hasAssertions();
    expect(promRegistryProviderImp({}, "")).toBeInstanceOf(Registry);
  });

  it("promRegistryProviderImp should be instance of registry with promRegistryName", () => {
    expect.hasAssertions();
    expect(promRegistryProviderImp({}, "PROM_REGISTRY_DEFAULT")).toBeInstanceOf(
      Registry
    );
  });

  it("promRegistryProviderImp should be instance of registry with defaultMetrics", () => {
    expect.hasAssertions();
    expect(
      promRegistryProviderImp(
        {
          defaultMetrics: {
            config: {},
            enabled: true,
          },
        },
        ""
      )
    ).toBeInstanceOf(Registry);
  });
});
