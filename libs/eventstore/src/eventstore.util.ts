import { EventStoreConnection } from "@eventstore/db-client";
import { EventstoreModuleOptions } from "./eventstore.module.interface";

let eventStoreConnectionInstance: EventStoreConnection;

export function getOrCreateEventstoreInstance(
  options: EventstoreModuleOptions,
  isTest = false
): EventStoreConnection {
  if (eventStoreConnectionInstance === undefined || isTest) {
    eventStoreConnectionInstance = EventStoreConnection.builder()
      .insecure()
      .singleNodeConnection(options.singleNodeConnection.uri);
  }
  return eventStoreConnectionInstance;
}

export function getTokenName(targetName: string, methodName: string): string {
  return `${targetName}_${methodName}`;
}

export function makeDefaultOptions(
  options?: EventstoreModuleOptions
): EventstoreModuleOptions {
  return {
    ...options,
    eventHandlers: options === undefined ? [] : options.eventHandlers,
    loggerContext: options === undefined ? "eventstore" : options.loggerContext,
    singleNodeConnection:
      options === undefined ? { uri: "" } : options.singleNodeConnection,
    stream: options === undefined ? "eventstore" : options.stream,
  };
}
