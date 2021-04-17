import { EVENTSTORE_INSTANCE_TOKEN } from "./eventstore.constant";
import { EventstoreService } from "./eventstore.service";
import { EventstoreServiceInterface } from "./eventstore.service.interface";
import { Test } from "@nestjs/testing";

describe("EventstoreService", () => {
  const eventsourceServiceMock: EventstoreServiceInterface = {
    readEventsFromStream: jest.fn(),
    writeEventsToStream: jest.fn(),
  };

  let service: EventstoreService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EventstoreService,
        {
          provide: EVENTSTORE_INSTANCE_TOKEN,
          useValue: eventsourceServiceMock,
        },
      ],
    }).compile();
    service = module.get<EventstoreService>(EventstoreService);
  });

  it("should be defined", () => {
    expect.hasAssertions();
    expect(service).toBeDefined();
  });

  it.todo("readEventsFromStream method should be test.");
  it.todo("writeEventsToStream method should be test.");
});
