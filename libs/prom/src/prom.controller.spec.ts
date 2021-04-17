import { PROM_REGISTRY_DEFAULT } from "./prom.constant";
import { PromController } from "./prom.controller";
import { Test } from "@nestjs/testing";

describe("PromController", () => {
  let controller: PromController;

  // TODO: interface ?
  const registryMock = {
    metrics: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PromController],
      providers: [{ provide: PROM_REGISTRY_DEFAULT, useValue: registryMock }],
    }).compile();
    controller = module.get<PromController>(PromController);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(controller).toBeDefined();
  });

  it("index should be called", () => {
    expect.hasAssertions();
    controller.index();
    expect(registryMock.metrics).toHaveBeenCalledWith();
    registryMock.metrics.mockReset();
  });
});
