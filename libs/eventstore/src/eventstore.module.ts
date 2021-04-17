import { DynamicModule, Module } from "@nestjs/common";
import {
  EventstoreModuleAsyncOptions,
  EventstoreModuleOptions,
} from "./eventstore.module.interface";

import { EventstoreCoreModule } from "./eventstore-core.module";

@Module({})
export class EventstoreModule {
  static forRoot(options?: EventstoreModuleOptions): DynamicModule {
    return {
      imports: [EventstoreCoreModule.forRoot(options)],
      module: EventstoreModule,
    };
  }

  static forRootAsync(options: EventstoreModuleAsyncOptions): DynamicModule {
    return {
      imports: [EventstoreCoreModule.forRootAsync(options)],
      module: EventstoreModule,
    };
  }
}
