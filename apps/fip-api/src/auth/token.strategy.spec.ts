import { RtResDto } from "@fip/common";
import { RtService } from "../rt/rt.service";
import { RtServiceInterface } from "../rt/rt.service.interface";
import { Test } from "@nestjs/testing";
import { TokenStrategy } from "./token.strategy";

describe("TokenStrategy", () => {
  const rt: RtResDto = {
    createdAt: 0,
    description: "",
    expireAt: 1000,
    id: 0,
    isBlocked: false,
    token: "",
    userId: 0,
  };

  const rtServiceMock: RtServiceInterface = {
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

  let service: RtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RtService,
          useValue: rtServiceMock,
        },
      ],
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(new TokenStrategy(service)).toBeDefined();
  });

  it("validate should be equal to an auth strategy", async () => {
    expect.hasAssertions();
    expect(await new TokenStrategy(service).validate("")).toStrictEqual({
      sub: "0",
    });
  });

  it("validate should throw an error", async () => {
    expect.hasAssertions();

    const rtServiceMockValidateByToken: RtServiceInterface = {
      ...rtServiceMock,
      validateByToken: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RtService,
          useValue: rtServiceMockValidateByToken,
        },
      ],
    }).compile();
    service = module.get<RtService>(RtService);

    await expect(new TokenStrategy(service).validate("")).rejects.toThrow("");
  });
});
