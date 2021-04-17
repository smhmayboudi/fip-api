import { Logger } from "@nestjs/common";
import typeorm from "typeorm";

export class CommonTypeOrmLogger implements typeorm.Logger {
  private readonly logger: Logger;
  private readonly options?:
    | boolean
    | "all"
    | ("log" | "info" | "warn" | "query" | "schema" | "error" | "migration")[]
    | undefined;

  constructor(
    context: string,
    options?:
      | boolean
      | "all"
      | ("log" | "info" | "warn" | "query" | "schema" | "error" | "migration")[]
      | undefined
  ) {
    this.logger = new Logger(context);
    this.options = options;
  }

  private query(query: string, parameters: unknown[] | undefined): string {
    return `${query}${
      parameters !== undefined && parameters.length !== 0
        ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
        : ""
    }`;
  }

  private stringifyParams(parameters: unknown[]): unknown {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      return parameters;
    }
  }

  logQuery(
    query: string,
    parameters?: unknown[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("query"))
    ) {
      this.logger.log(`query: ${this.query(query, parameters)}`);
    }
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: unknown[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      this.options === true ||
      (this.options instanceof Array && this.options.includes("error"))
    ) {
      this.logger.error(
        `query failed: ${this.query(query, parameters)}, with error: ${error}`
      );
    }
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[] | undefined,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    this.logger.log(
      `query is slow: ${this.query(
        query,
        parameters
      )}, with execution time: ${time}`
    );
  }

  logSchemaBuild(
    message: string,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    if (
      this.options === "all" ||
      (this.options instanceof Array && this.options.includes("schema"))
    ) {
      this.logger.log(message);
    }
  }

  logMigration(
    message: string,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    this.logger.log(message);
  }

  log(
    level: "log" | "info" | "warn",
    message: unknown,
    _queryRunner?: typeorm.QueryRunner | undefined
  ): void {
    switch (level) {
      case "log":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("log"))
        )
          this.logger.log(message);
        break;
      case "info":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("info"))
        )
          this.logger.log(`INFO: ${message}`);
        break;
      case "warn":
        if (
          this.options === "all" ||
          (this.options instanceof Array && this.options.includes("warn"))
        )
          this.logger.warn(message);
        break;
    }
  }
}
