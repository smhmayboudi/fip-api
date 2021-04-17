import { PromMetricType } from "./prom.metric.type";

describe("PromMetricType", () => {
  it("should be equal to prom metric type", () => {
    expect.hasAssertions();
    expect(PromMetricType).toStrictEqual({
      counter: "counter",
      gauge: "gauge",
      histogram: "histogram",
      summary: "summary",
    });
  });
});
