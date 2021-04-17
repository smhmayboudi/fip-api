import { JWKS, JwksFindOneReqDto, JwksResDto } from "@fip/common";

import { JwksService } from "./jwks.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("JwksService", () => {
  const jwks: JwksResDto = {
    id: "",
    privateKey: "",
    publicKey: "",
  };

  // TODO: interface ?
  const jwksClientKafkaMock = {
    send: () => of(jwks),
  };

  let service: JwksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwksService,
        { provide: JWKS, useValue: jwksClientKafkaMock },
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
    expect(await service.findOne(dto)).toStrictEqual(jwks);
  });

  it("getOneRandom should be equal to an jwksEntity", async () => {
    expect.hasAssertions();
    expect(await service.getOneRandom()).toStrictEqual(jwks);
  });
});
