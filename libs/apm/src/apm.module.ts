import {
  ApmModuleAsyncOptions,
  ApmModuleOptions,
} from "./apm.module.interface";
import { DynamicModule, Module } from "@nestjs/common";

import { ApmCoreModule } from "./apm-core.module";

@Module({})
export class ApmModule {
  static forRoot(options?: ApmModuleOptions): DynamicModule {
    return {
      imports: [ApmCoreModule.forRoot(options)],
      module: ApmModule,
    };
  }

  static forRootAsync(options: ApmModuleAsyncOptions): DynamicModule {
    return {
      imports: [ApmCoreModule.forRootAsync(options)],
      module: ApmModule,
    };
  }
}
