import { CommonTypeOrmLogger, USER } from "@fip/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

import { Injectable } from "@nestjs/common";
import { UserConfigService } from "./user.config.service";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly userConfigService: UserConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.userConfigService.typeormDatabase,
      entities: [UserEntity],
      host: this.userConfigService.typeormHost,
      logger: new CommonTypeOrmLogger(
        USER,
        this.userConfigService.typeormLogging
      ),
      logging: this.userConfigService.typeormLogging,
      name: connectionName,
      password: this.userConfigService.typeormPassword,
      port: this.userConfigService.typeormPort,
      synchronize: this.userConfigService.typeormSynchronize,
      type: "mysql",
      username: this.userConfigService.typeormUsername,
    };
  }
}
