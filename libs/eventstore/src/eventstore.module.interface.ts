import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

import { IEvent } from "@nestjs/cqrs";

export interface EventstoreModuleOptions {
  eventHandlers: EventHandler[];
  loggerContext: string;
  singleNodeConnection: {
    uri: string;
  };
  stream: string;
}
export interface EventstoreOptionsFactory {
  createEventstoreOptions: () =>
    | Promise<EventstoreModuleOptions>
    | EventstoreModuleOptions;
}
export interface EventstoreModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<EventstoreOptionsFactory>;
  useExisting?: Type<EventstoreOptionsFactory>;
  useFactory?: (
    ...args: unknown[]
  ) => Promise<EventstoreModuleOptions> | EventstoreModuleOptions;
}
export interface IEventstore extends IEvent {
  // created: number;
  data: Record<string, any>;
  eventType: string;
  // id: string;
  // isJson: boolean;
  // metadata: object;
  // revision: number;
  // streamId: string;
}
export type EventHandler = {
  eventBuilder: (data: any) => IEventstore;
  eventType: string;
};
