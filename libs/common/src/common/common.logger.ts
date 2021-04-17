import { Logger } from "@nestjs/common";
import util from "util";

const CommonLogger = (context: string) => ({
  debug(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.debug(util.format(obj, msg, ...args), context);
  },
  error(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, context);
  },
  fatal(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.error(util.format(obj, msg, ...args), undefined, context);
  },
  info(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.log(util.format(obj, msg, ...args), context);
  },
  trace(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.verbose(util.format(obj, msg, ...args), context);
  },
  warn(obj: unknown, msg?: unknown, ...args: unknown[]): void {
    Logger.warn(util.format(obj, msg, ...args), context);
  },
});

export { CommonLogger };
