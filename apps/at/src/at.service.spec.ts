import {
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtSaveReqDto,
  AtUpdateReqDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@fip/common";
import { DeleteResult, UpdateResult } from "typeorm";

import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";
import { AtEntityRepositoryInterface } from "./at.entity.repository.interface";
import { AtService } from "./at.service";
import { Test } from "@nestjs/testing";

describe("AtService", () => {
  const atEntity: AtEntity = {
    count: 0,
    createdAt: 0,
    expireAt: 0,
    id: 0,
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

  const atEntityRepositoryMock: AtEntityRepositoryInterface = {
    delete: () => Promise.resolve(deleteResult),
    find: () => Promise.resolve([atEntity]),
    findOne: () => Promise.resolve(atEntity),
    save: <AtEntity>(): Promise<AtEntity> =>
      (Promise.resolve(atEntity) as unknown) as Promise<AtEntity>,
    update: () => Promise.resolve(updateResult),
  };

  let service: AtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AtService,
        { provide: AtEntityRepository, useValue: atEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("delete should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtDeleteReqDto = { id: 0 };
    expect(await service.delete(dto)).toStrictEqual(atEntity);
  });

  it("deleteByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtDeleteByTokenReqDto = { token: "0" };
    expect(await service.deleteByToken(dto)).toStrictEqual(atEntity);
  });

  it("find should be equal to an ...", async () => {
    expect.hasAssertions();
    expect(await service.find()).toStrictEqual([atEntity]);
  });

  it("findOne should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtFindOneReqDto = { id: 0 };
    expect(await service.findOne(dto)).toStrictEqual(atEntity);
  });

  it("findOneByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtFindOneByTokenReqDto = { token: "0" };
    expect(await service.findOneByToken(dto)).toStrictEqual(atEntity);
  });

  it("save should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtSaveReqDto = atEntity;
    expect(await service.save(dto)).toStrictEqual(atEntity);
  });

  it("update should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtUpdateReqDto = atEntity;
    expect(await service.update(dto)).toStrictEqual(atEntity);
  });

  it("validate should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtValidateReqDto = {
      userId: 1,
    };
    expect(await service.validate(dto)).toStrictEqual(atEntity);
  });

  it("validateByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtValidateByTokenReqDto = { token: "0" };
    expect(await service.validateByToken(dto)).toStrictEqual(atEntity);
  });
});
