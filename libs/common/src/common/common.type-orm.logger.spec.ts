import { CommonTypeOrmLogger } from "./common.type-orm.logger";

describe("CommonTypeOrmLogger", () => {
  it("should be defined", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("")).toBeDefined();
  });

  it("logQuery should be undefined with parameters", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("", ["query"]).logQuery("", [""])
    ).toBeUndefined();
  });

  it("logQuery should be undefined", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("", ["query"]).logQuery("")).toBeUndefined();
  });

  it("logQuery should be undefined with empty options", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("", []).logQuery("")).toBeUndefined();
  });

  it("logQueryError should be undefined with parameters", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("", ["error"]).logQueryError("", "", [""])
    ).toBeUndefined();
  });

  it("logQueryError should be undefined", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("", ["error"]).logQueryError("", "")
    ).toBeUndefined();
  });

  it("logQueryError should be undefined with empty options", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("", []).logQueryError("", "")
    ).toBeUndefined();
  });

  it("logQuerySlow should be undefined with parameters", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("").logQuerySlow(0, "", [""])
    ).toBeUndefined();
  });

  it("logQuerySlow should be undefined", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("").logQuerySlow(0, "")).toBeUndefined();
  });

  it("logSchemaBuild should be undefined", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("", ["schema"]).logSchemaBuild("")
    ).toBeUndefined();
  });

  it("logSchemaBuild should be undefined with empty options", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("", []).logSchemaBuild("")).toBeUndefined();
  });

  it("logMigration should be undefined", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("").logMigration("")).toBeUndefined();
  });

  it("log should be undefined level log", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("", ["log"]).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level log with empty options", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("", []).log("log", "")).toBeUndefined();
  });

  it("log should be undefined level info", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("", ["info"]).log("info", "")
    ).toBeUndefined();
  });

  it("log should be undefined level info with empty options", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("", []).log("info", "")).toBeUndefined();
  });

  it("log should be undefined level warn", () => {
    expect.hasAssertions();
    expect(
      new CommonTypeOrmLogger("", ["warn"]).log("warn", "")
    ).toBeUndefined();
  });

  it("log should be undefined level warn with empty options", () => {
    expect.hasAssertions();
    expect(new CommonTypeOrmLogger("", []).log("warn", "")).toBeUndefined();
  });
});
