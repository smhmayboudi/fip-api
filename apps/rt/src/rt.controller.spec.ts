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

import { RtController } from "./rt.controller";
import { RtService } from "./rt.service";
import { RtServiceInterface } from "./rt.service.interface";
import { Test } from "@nestjs/testing";

describe("RtController", () => {
  const rt: RtResDto = {
    createdAt: 0,
    description: "",
    expireAt: 0,
    id: 0,
    isBlocked: false,
    token: "",
    userId: 0,
  };

  const atServiceMock: RtServiceInterface = {
    block: () => Promise.resolve(rt),
    blockByToken: () => Promise.resolve(rt),
    delete: () => Promise.resolve(rt),
    deleteByToken: () => Promise.resolve(rt),
    find: () => Promise.resolve([rt]),
    findOne: () => Promise.resolve(rt),
    findOneByToken: () => Promise.resolve(rt),
    save: () => Promise.resolve(rt),
    validate: () => Promise.resolve(rt),
    validateByToken: () => Promise.resolve(rt),
  };

  let controller: RtController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RtController],
      providers: [{ provide: RtService, useValue: atServiceMock }],
    }).compile();
    controller = module.get<RtController>(RtController);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(controller).toBeDefined();
  });

  it("block should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtBlockReqDto = {
      description: "",
      id: 0,
    };
    expect(await controller.block(dto)).toStrictEqual(rt);
  });

  it("blockByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtBlockByTokenReqDto = {
      description: "",
      token: "",
    };
    expect(await controller.blockByToken(dto)).toStrictEqual(rt);
  });

  it("delete should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtDeleteReqDto = {
      id: 0,
    };
    expect(await controller.delete(dto)).toStrictEqual(rt);
  });

  it("deleteByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtDeleteByTokenReqDto = {
      token: "",
    };
    expect(await controller.deleteByToken(dto)).toStrictEqual(rt);
  });

  it("find should be equal to an ...", async () => {
    expect.hasAssertions();
    expect(await controller.find()).toStrictEqual([rt]);
  });

  it("findOne should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtFindOneReqDto = {
      id: 0,
    };
    expect(await controller.findOne(dto)).toStrictEqual(rt);
  });

  it("findOneByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await controller.findOneByToken(dto)).toStrictEqual(rt);
  });

  it("save should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtSaveReqDto = rt;
    expect(await controller.save(dto)).toStrictEqual(rt);
  });

  it("validate should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtValidateReqDto = {
      userId: 1,
    };
    expect(await controller.validate(dto)).toStrictEqual(rt);
  });

  it("validateByToken should be equal to a rt", async () => {
    expect.hasAssertions();
    const dto: RtValidateByTokenReqDto = {
      token: "",
    };
    expect(await controller.validateByToken(dto)).toStrictEqual(rt);
  });
});
