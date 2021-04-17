import { CqrsModule, EventBus } from "@nestjs/cqrs";
import {
  DynamicModule,
  Global,
  Module,
  OnModuleInit,
  Provider,
  Type,
} from "@nestjs/common";
import {
  EVENTSTORE_INSTANCE_TOKEN,
  EVENTSTORE_MODULE_OPTIONS,
} from "./eventstore.constant";
import {
  EventstoreModuleAsyncOptions,
  EventstoreModuleOptions,
  EventstoreOptionsFactory,
  IEventstore,
} from "./eventstore.module.interface";
import {
  getOrCreateEventstoreInstance,
  makeDefaultOptions,
} from "./eventstore.util";

import { EventStoreConnection } from "@eventstore/db-client";
import { EventstorePubSub } from "./eventstore.pub-sub";
import { EventstoreService } from "./eventstore.service";

@Global()
@Module({
  exports: [EventstorePubSub, EventstoreService],
  imports: [CqrsModule],
  providers: [EventstorePubSub, EventstoreService],
})
export class EventstoreCoreModule implements OnModuleInit {
  private static createAsyncOptionsProvider(
    options: EventstoreModuleAsyncOptions
  ): Provider<Promise<EventstoreModuleOptions> | EventstoreModuleOptions> {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: EVENTSTORE_MODULE_OPTIONS,
        useFactory: async (...args): Promise<EventstoreModuleOptions> =>
          makeDefaultOptions(
            options.useFactory && (await options.useFactory(args))
          ),
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<
        EventstoreOptionsFactory
      >,
    ];
    return {
      inject,
      provide: EVENTSTORE_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: EventstoreOptionsFactory
      ): Promise<EventstoreModuleOptions> =>
        makeDefaultOptions(await optionsFactory.createEventstoreOptions()),
    };
  }

  private static createAsyncProviders(
    options: EventstoreModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<EventstoreOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  static forRoot(options?: EventstoreModuleOptions): DynamicModule {
    const opts = makeDefaultOptions(options);
    const eventstoreInstanceProvider: Provider<EventStoreConnection> = {
      provide: EVENTSTORE_INSTANCE_TOKEN,
      useValue: getOrCreateEventstoreInstance(opts),
    };
    const eventstoreModuleOptionsProvider: Provider<EventstoreModuleOptions> = {
      provide: EVENTSTORE_MODULE_OPTIONS,
      useValue: opts,
    };
    return {
      exports: [eventstoreInstanceProvider],
      module: EventstoreCoreModule,
      providers: [eventstoreInstanceProvider, eventstoreModuleOptionsProvider],
    };
  }

  static forRootAsync(options: EventstoreModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    const eventstoreInstanceProvider: Provider<EventStoreConnection> = {
      inject: [EVENTSTORE_MODULE_OPTIONS],
      provide: EVENTSTORE_INSTANCE_TOKEN,
      useFactory: (options: EventstoreModuleOptions) =>
        getOrCreateEventstoreInstance(options),
    };
    return {
      exports: [eventstoreInstanceProvider],
      imports: options.imports,
      module: EventstoreCoreModule,
      providers: [...asyncProviders, eventstoreInstanceProvider],
    };
  }

  constructor(
    private readonly eventBus: EventBus<IEventstore>,
    private readonly eventstorePubSub: EventstorePubSub
  ) {}

  onModuleInit(): void {
    void this.eventstorePubSub.bridgeEventsTo(this.eventBus.subject$);
    this.eventBus.publisher = this.eventstorePubSub;
  }
}
