import { CommonTypeOrmLogger, JWKS } from "@fip/common";

import { JwksConfigService } from "./jwks.config.service";
import { JwksConfigServiceInterface } from "./jwks.config.service.interface";
import { JwksEntity } from "./jwks.entity";
import { JwksTypeOrmOptionsFactory } from "./jwks.type-orm.options.factory";
import { Test } from "@nestjs/testing";

describe("JwksTypeOrmOptionsFactory", () => {
  const jwksConfigServiceMock: JwksConfigServiceInterface = {
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let service: JwksConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: JwksConfigService, useValue: jwksConfigServiceMock },
      ],
    }).compile();
    service = module.get<JwksConfigService>(JwksConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new JwksTypeOrmOptionsFactory(service)).toBeDefined();
  });

  it("createSentryOptions should be equal to a value", () => {
    expect.hasAssertions();
    expect(
      JSON.stringify(
        new JwksTypeOrmOptionsFactory(service).createTypeOrmOptions()
      )
    ).toStrictEqual(
      JSON.stringify({
        database: "",
        entities: [JwksEntity],
        host: "",
        logger: new CommonTypeOrmLogger(JWKS, true),
        logging: true,
        name: undefined,
        password: "",
        port: 0,
        synchronize: true,
        type: "mysql",
        username: "",
      })
    );
  });
});
