import * as Sentry from "@sentry/node";

import { Integrations, getCurrentHub } from "@sentry/node";

import { Client } from "@sentry/types";
import { SentryModuleOptions } from "./sentry.module.interface";

let sentryInstance: typeof Sentry | undefined;

export function getOrCreateSentryInstance(
  options: SentryModuleOptions,
  isTest = false
): typeof Sentry {
  if (sentryInstance === undefined || isTest) {
    Sentry.init({
      debug: options.debug,
      dsn: options.dsn,
      environment: options.environment,
      integrations: [
        new Integrations.OnUncaughtException({
          onFatalError: (error): void => {
            if (error.name !== "SentryError") {
              const client = getCurrentHub().getClient<Client>();
              if (client !== undefined) {
                client.captureException(error);
              }
              process.exit(1);
            }
          },
        }),
        new Integrations.OnUnhandledRejection(),
      ],
      logLevel: options.logLevel,
      release: options.release,
    });
    sentryInstance = Sentry;
  }
  return sentryInstance;
}

export function makeDefaultOptions(
  options?: SentryModuleOptions
): SentryModuleOptions {
  return {
    ...options,
  };
}
