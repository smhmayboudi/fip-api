import {
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

import { AtController } from "./at.controller";
import { AtService } from "./at.service";
import { AtServiceInterface } from "./at.service.interface";
import { Test } from "@nestjs/testing";

describe("AtController", () => {
  const at: AtResDto = {
    count: 0,
    createdAt: 0,
    expireAt: 0,
    id: 0,
    token: "",
    userId: 0,
  };

  const atServiceMock: AtServiceInterface = {
    delete: () => Promise.resolve(at),
    deleteByToken: () => Promise.resolve(at),
    find: () => Promise.resolve([at]),
    findOne: () => Promise.resolve(at),
    findOneByToken: () => Promise.resolve(at),
    save: () => Promise.resolve(at),
    update: () => Promise.resolve(at),
    validate: () => Promise.resolve(at),
    validateByToken: () => Promise.resolve(at),
  };

  let controller: AtController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AtController],
      providers: [{ provide: AtService, useValue: atServiceMock }],
    }).compile();
    controller = module.get<AtController>(AtController);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(controller).toBeDefined();
  });

  it("delete should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtDeleteReqDto = { id: 0 };
    expect(await controller.delete(dto)).toStrictEqual(at);
  });

  it("deleteByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtDeleteByTokenReqDto = { token: "0" };
    expect(await controller.deleteByToken(dto)).toStrictEqual(at);
  });

  it("find should be equal to an ...", async () => {
    expect.hasAssertions();
    expect(await controller.find()).toStrictEqual([at]);
  });

  it("findOne should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtFindOneReqDto = { id: 0 };
    expect(await controller.findOne(dto)).toStrictEqual(at);
  });

  it("findOneByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtFindOneByTokenReqDto = { token: "0" };
    expect(await controller.findOneByToken(dto)).toStrictEqual(at);
  });

  it("save should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtSaveReqDto = at;
    expect(await controller.save(dto)).toStrictEqual(at);
  });

  it("update should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtUpdateReqDto = at;
    expect(await controller.update(dto)).toStrictEqual(at);
  });

  it("validate should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtValidateReqDto = {
      userId: 1,
    };
    expect(await controller.validate(dto)).toStrictEqual(at);
  });

  it("validateByToken should be equal to an at", async () => {
    expect.hasAssertions();
    const dto: AtValidateByTokenReqDto = { token: "0" };
    expect(await controller.validateByToken(dto)).toStrictEqual(at);
  });
});
