import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { UserConfigService } from "./user.config.service";

describe("UserConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: UserConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserConfigService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    service = module.get<UserConfigService>(UserConfigService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("servicePort should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.servicePort).toStrictEqual(0);
  });

  it("serviceRetryAttempts should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.serviceRetryAttempts).toStrictEqual(0);
  });

  it("serviceRetryDelay should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.serviceRetryDelay).toStrictEqual(0);
  });

  it("serviceUrl should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.serviceUrl).toStrictEqual("");
  });

  it("typeormDatabase should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.typeormDatabase).toStrictEqual("");
  });

  it("typeormHost should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.typeormHost).toStrictEqual("");
  });

  it("typeormLogging should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.typeormLogging).toStrictEqual(true);
  });

  it("typeormPassword should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.typeormPassword).toStrictEqual("");
  });

  it("typeormPort should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.typeormPort).toStrictEqual(0);
  });

  it("typeormSynchronize should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.typeormSynchronize).toStrictEqual(true);
  });

  it("typeormUsername should be equal to a value", () => {
    expect.hasAssertions();
    expect(service.typeormUsername).toStrictEqual("");
  });
});
