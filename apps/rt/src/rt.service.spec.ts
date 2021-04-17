import { DeleteResult, UpdateResult } from "typeorm";
import {
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteByTokenReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@fip/common";

import { RtEntityRepository } from "./rt.entity.repository";
import { RtEntityRepositoryInterface } from "./rt.entity.repository.interface";
import { RtService } from "./rt.service";
import { Test } from "@nestjs/testing";

describe("RtService", () => {
  const rtEntity: RtResDto = {
    createdAt: 0,
    description: "",
    expireAt: 0,
    id: 0,
    isBlocked: false,
    token: "",
    userId: 0,
  };
  const deleteResult: DeleteResult = {
    raw: "",
  };
  const updateResult: UpdateResult = {
    generatedMaps: [{}],
    raw: "",
  };

  const rtEntityRepositoryMock: RtEntityRepositoryInterface = {
    delete: () => Promise.resolve(deleteResult),
    find: () => Promise.resolve([rtEntity]),
    findOne: () => Promise.resolve(rtEntity),
    save: <RtEntity>(): Promise<RtEntity> =>
      (Promise.resolve(rtEntity) as unknown) as Promise<RtEntity>,
    update: () => Promise.resolve(updateResult),
  };

  let service: RtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RtService,
        { provide: RtEntityRepository, useValue: rtEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("block should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtBlockReqDto = {
      description: "",
      id: 0,
    };
    expect(await service.block(dto)).toStrictEqual({
      ...rtEntity,
      is_blocked: false,
    });
  });

  it("blockByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtBlockByTokenReqDto = {
      description: "",
      token: "",
    };
    expect(await service.blockByToken(dto)).toStrictEqual({
      ...rtEntity,
      is_blocked: false,
    });
  });

  it("delete should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtDeleteReqDto = {
      id: 0,
    };
    expect(await service.delete(dto)).toStrictEqual(rtEntity);
  });

  it("deleteByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtDeleteByTokenReqDto = {
      token: "",
    };
    expect(await service.deleteByToken(dto)).toStrictEqual(rtEntity);
  });

  it("find should be equal to an ...", async () => {
    expect.hasAssertions();
    expect(await service.find()).toStrictEqual([rtEntity]);
  });

  it("findOne should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toStrictEqual(rtEntity);
  });

  it("findOneByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await service.findOneByToken(dto)).toStrictEqual(rtEntity);
  });

  it("save should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtSaveReqDto = rtEntity;
    expect(await service.save(dto)).toStrictEqual(rtEntity);
  });

  it("validate should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtValidateReqDto = {
      userId: 1,
    };
    expect(await service.validate(dto)).toStrictEqual(rtEntity);
  });

  it("validateByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtValidateByTokenReqDto = {
      token: "",
    };
    expect(await service.validateByToken(dto)).toStrictEqual(rtEntity);
  });
});
