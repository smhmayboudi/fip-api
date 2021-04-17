import {
  AT,
  AT_FIND,
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtResDto,
  AtSaveReqDto,
  AtUpdateReqDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@fip/common";

import { AtService } from "./at.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("AtService", () => {
  const at: AtResDto = {
    count: 0,
    createdAt: 0,
    expireAt: 0,
    id: 0,
    token: "",
    userId: 0,
  };

  // TODO: interface ?
  const atClientKafkaMock = {
    send: (token: string) => (token === AT_FIND ? of([at]) : of(at)),
  };

  let service: AtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AtService, { provide: AT, useValue: atClientKafkaMock }],
    }).compile();
    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("delete should be equal to delete result", async () => {
    expect.hasAssertions();
    const dto: AtDeleteReqDto = {
      id: 0,
    };
    expect(await service.delete(dto)).toStrictEqual(at);
  });

  it("deleteByToken should be equal to delete result", async () => {
    expect.hasAssertions();
    const dto: AtDeleteByTokenReqDto = {
      token: "",
    };
    expect(await service.deleteByToken(dto)).toStrictEqual(at);
  });

  it("find sholud equal to array of at", async () => {
    expect.hasAssertions();
    expect(await service.find()).toStrictEqual([at]);
  });

  it("findOne should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toStrictEqual(at);
  });

  it("findOneByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await service.findOneByToken(dto)).toStrictEqual(at);
  });

  it("save should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtSaveReqDto = at;
    expect(await service.save(dto)).toStrictEqual(at);
  });

  it("update should be equal to update result", async () => {
    expect.hasAssertions();
    const dto: AtUpdateReqDto = at;
    expect(await service.update(dto)).toStrictEqual(at);
  });

  it("validateByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtValidateByTokenReqDto = {
      token: "",
    };
    expect(await service.validateByToken(dto)).toStrictEqual(at);
  });

  it("validate should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtValidateReqDto = {
      userId: 1,
    };
    expect(await service.validate(dto)).toStrictEqual(at);
  });
});
