import {
  RT,
  RT_FIND,
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@fip/common";

import { RtService } from "./rt.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("RtService", () => {
  const rt: RtResDto = {
    createdAt: 0,
    description: "",
    expireAt: 0,
    id: 0,
    isBlocked: false,
    token: "",
    userId: 0,
  };

  // TODO: interface ?
  const rtClientKafkaMock = {
    send: (token: string) => (token === RT_FIND ? of([rt]) : of(rt)),
  };

  let service: RtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RtService, { provide: RT, useValue: rtClientKafkaMock }],
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("block should be equal to an rt", async () => {
    expect.hasAssertions();
    const dto: RtBlockReqDto = {
      description: "",
      id: 0,
    };
    expect(await service.block(dto)).toStrictEqual(rt);
  });

  it("blockByToken should be equal to an rt", async () => {
    expect.hasAssertions();
    const dto: RtBlockByTokenReqDto = {
      description: "",
      token: "",
    };
    expect(await service.blockByToken(dto)).toStrictEqual(rt);
  });

  it("delete should be equal to an rt", async () => {
    expect.hasAssertions();
    const dto: RtDeleteReqDto = {
      id: 0,
    };
    expect(await service.delete(dto)).toStrictEqual(rt);
  });

  it("find should be equal to an array of RT entities", async () => {
    expect.hasAssertions();
    expect(await service.find()).toStrictEqual([rt]);
  });

  it("findOne should be equal to an rt", async () => {
    expect.hasAssertions();
    const dto: RtFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toStrictEqual(rt);
  });

  it("findOneByToken should be equal to an rt", async () => {
    expect.hasAssertions();
    const dto: RtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await service.findOneByToken(dto)).toStrictEqual(rt);
  });

  it("save should be equal to an array of RT entities", async () => {
    expect.hasAssertions();
    const dto: RtSaveReqDto = rt;
    expect(await service.save(dto)).toStrictEqual(rt);
  });

  it("validate should be equal to an rt", async () => {
    expect.hasAssertions();
    const dto: RtValidateReqDto = {
      userId: 1,
    };
    expect(await service.validate(dto)).toStrictEqual(rt);
  });

  it("validateByToken should be equal to an rt", async () => {
    expect.hasAssertions();
    const dto: RtValidateByTokenReqDto = {
      token: "",
    };
    expect(await service.validateByToken(dto)).toStrictEqual(rt);
  });
});
