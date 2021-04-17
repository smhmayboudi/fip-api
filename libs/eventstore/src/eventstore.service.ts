import {
  EventStoreConnection,
  deleteStream,
  readAllEvents,
  readEventsFromStream,
  subscribeToAll,
  subscribeToStream,
  tombstoneStream,
  writeEventsToStream,
} from "@eventstore/db-client";
import { Inject, Injectable } from "@nestjs/common";

import { DeleteStream } from "@eventstore/db-client/dist/command/streams/DeleteStream";
import { EVENTSTORE_INSTANCE_TOKEN } from "./eventstore.constant";
import { EventstoreServiceInterface } from "./eventstore.service.interface";
import { ReadAllEvents } from "@eventstore/db-client/dist/command/streams/ReadAllEvents";
import { ReadEventsFromStream } from "@eventstore/db-client/dist/command/streams/ReadEventsFromStream";
import { SubscribeToAll } from "@eventstore/db-client/dist/command/streams/SubscribeToAll";
import { SubscribeToStream } from "@eventstore/db-client/dist/command/streams/SubscribeToStream";
import { TombstoneStream } from "@eventstore/db-client/dist/command/streams/TombstoneStream";
import { WriteEventsToStream } from "@eventstore/db-client/dist/command/streams/WriteEventsToStream";

@Injectable()
export class EventstoreService implements EventstoreServiceInterface {
  constructor(
    @Inject(EVENTSTORE_INSTANCE_TOKEN)
    private readonly eventStoreConnection: EventStoreConnection
  ) {}

  getConnection(): EventStoreConnection {
    return this.eventStoreConnection;
  }

  deleteStream(stream: string): DeleteStream {
    return deleteStream(stream);
  }

  readAllEvents(): ReadAllEvents {
    return readAllEvents();
  }

  readEventsFromStream(stream: string): ReadEventsFromStream {
    return readEventsFromStream(stream);
  }
  subscribeToAll(): SubscribeToAll {
    return subscribeToAll();
  }

  subscribeToStream(stream: string): SubscribeToStream {
    return subscribeToStream(stream);
  }

  tombstoneStream(stream: string): TombstoneStream {
    return tombstoneStream(stream);
  }

  writeEventsToStream(stream: string): WriteEventsToStream {
    return writeEventsToStream(stream);
  }
}
