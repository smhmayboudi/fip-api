import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksEntityRepositoryInterface } from "./jwks.entity.repository.interface";
import { JwksFindOneReqDto } from "@fip/common";
import { JwksService } from "./jwks.service";
import { Test } from "@nestjs/testing";

describe("JwksService", () => {
  const jwksEntity: JwksEntity = {
    id: "",
    privateKey: "",
    publicKey: "",
  };

  const jwksEntityRepositoryMock: JwksEntityRepositoryInterface = {
    findOne: () => Promise.resolve(jwksEntity),
    getOneRandom: () => Promise.resolve(jwksEntity),
  };

  let service: JwksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwksService,
        { provide: JwksEntityRepository, useValue: jwksEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("findOne should be equal to an jwksEntity", async () => {
    expect.hasAssertions();
    const dto: JwksFindOneReqDto = {
      id: "",
    };
    expect(await service.findOne(dto)).toStrictEqual(jwksEntity);
  });

  it("getOneRandom should be equal to an jwksEntity", async () => {
    expect.hasAssertions();
    expect(await service.getOneRandom()).toStrictEqual(jwksEntity);
  });
});
