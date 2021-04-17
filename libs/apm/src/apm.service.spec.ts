import { APM_INSTANCE_TOKEN } from "./apm.constant";
import { ApmService } from "./apm.service";
import { ApmServiceInterface } from "./apm.service.interface";
import { Test } from "@nestjs/testing";

describe("ApmService", () => {
  const ampServiceMock: ApmServiceInterface = {
    addErrorFilter: jest.fn(),
    addFilter: jest.fn(),
    addLabels: jest.fn(),
    addPatch: jest.fn(),
    addSpanFilter: jest.fn(),
    addTransactionFilter: jest.fn(),
    captureError: jest.fn(),
    clearPatches: jest.fn(),
    currentSpan: null,
    currentTraceparent: null,
    currentTransaction: null,
    destroy: jest.fn(),
    endTransaction: jest.fn(),
    flush: jest.fn(),
    handleUncaughtExceptions: jest.fn(),
    isStarted: jest.fn(),
    lambda: jest.fn(),
    logger: {
      debug: (): void => undefined,
      error: (): void => undefined,
      fatal: (): void => undefined,
      info: (): void => undefined,
      trace: (): void => undefined,
      warn: (): void => undefined,
    },
    middleware: { connect: () => (): void => undefined },
    removePatch: jest.fn(),
    setCustomContext: jest.fn(),
    setFramework: jest.fn(),
    setLabel: jest.fn(),
    setTransactionName: jest.fn(),
    setUserContext: jest.fn(),
    start: jest.fn(),
    startSpan: jest.fn(),
    startTransaction: jest.fn(),
  };

  let service: ApmService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ApmService,
        { provide: APM_INSTANCE_TOKEN, useValue: ampServiceMock },
      ],
    }).compile();
    service = module.get<ApmService>(ApmService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it("start should be called", () => {
    expect.hasAssertions();
    service.start();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.start).toHaveBeenCalledWith();
  });

  it("isStarted should be called", () => {
    expect.hasAssertions();
    service.isStarted();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.isStarted).toHaveBeenCalledWith();
  });

  it("setFramework should be called", () => {
    expect.hasAssertions();
    service.setFramework({});
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.setFramework).toHaveBeenCalledWith();
  });

  it("addPatch should be called", () => {
    expect.hasAssertions();
    service.addPatch("", "");
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.addPatch).toHaveBeenCalledWith();
  });

  it("removePatch should be called", () => {
    expect.hasAssertions();
    service.removePatch("", "");
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.removePatch).toHaveBeenCalledWith();
  });

  it("clearPatches should be called", () => {
    expect.hasAssertions();
    service.clearPatches("");
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.clearPatches).toHaveBeenCalledWith();
  });

  it("lambda should be called", () => {
    expect.hasAssertions();
    service.lambda(() => undefined);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.lambda).toHaveBeenCalledWith();
  });

  it("handleUncaughtExceptions should be called", () => {
    expect.hasAssertions();
    service.handleUncaughtExceptions();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.handleUncaughtExceptions).toHaveBeenCalledWith();
  });

  it("captureError should be called", () => {
    expect.hasAssertions();
    service.captureError("");
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.captureError).toHaveBeenCalledWith();
  });

  it("startTransaction should be called", () => {
    expect.hasAssertions();
    service.startTransaction();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.startTransaction).toHaveBeenCalledWith();
  });

  it("setTransactionName should be called", () => {
    expect.hasAssertions();
    service.setTransactionName("");
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.setTransactionName).toHaveBeenCalledWith();
  });

  it("endTransaction should be called", () => {
    expect.hasAssertions();
    service.endTransaction();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.endTransaction).toHaveBeenCalledWith();
  });

  it("startSpan should be called", () => {
    expect.hasAssertions();
    service.startSpan();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.startSpan).toHaveBeenCalledWith();
  });

  it("setLabel should be called", () => {
    expect.hasAssertions();
    service.setLabel("", "");
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.setLabel).toHaveBeenCalledWith();
  });

  it("addLabels should be called", () => {
    expect.hasAssertions();
    service.addLabels({});
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.addLabels).toHaveBeenCalledWith();
  });

  it("setUserContext should be called", () => {
    expect.hasAssertions();
    service.setUserContext({});
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.setUserContext).toHaveBeenCalledWith();
  });

  it("setCustomContext should be called", () => {
    expect.hasAssertions();
    service.setCustomContext({});
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.setCustomContext).toHaveBeenCalledWith();
  });

  it("addFilter should be called", () => {
    expect.hasAssertions();
    service.addFilter(() => true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.addFilter).toHaveBeenCalledWith();
  });

  it("addErrorFilter should be called", () => {
    expect.hasAssertions();
    service.addErrorFilter(() => true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.addErrorFilter).toHaveBeenCalledWith();
  });

  it("addSpanFilter should be called", () => {
    expect.hasAssertions();
    service.addSpanFilter(() => true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.addSpanFilter).toHaveBeenCalledWith();
  });

  it("addTransactionFilter should be called", () => {
    expect.hasAssertions();
    service.addTransactionFilter(() => true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.addTransactionFilter).toHaveBeenCalledWith();
  });

  it("flush should be called", () => {
    expect.hasAssertions();
    service.flush();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.flush).toHaveBeenCalledWith();
  });

  it("destroy should be called", () => {
    expect.hasAssertions();
    service.destroy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ampServiceMock.destroy).toHaveBeenCalledWith();
  });
});
