import { DeleteStream } from "@eventstore/db-client/dist/command/streams/DeleteStream";
import { ReadAllEvents } from "@eventstore/db-client/dist/command/streams/ReadAllEvents";
import { ReadEventsFromStream } from "@eventstore/db-client/dist/command/streams/ReadEventsFromStream";
import { SubscribeToAll } from "@eventstore/db-client/dist/command/streams/SubscribeToAll";
import { SubscribeToStream } from "@eventstore/db-client/dist/command/streams/SubscribeToStream";
import { TombstoneStream } from "@eventstore/db-client/dist/command/streams/TombstoneStream";
import { WriteEventsToStream } from "@eventstore/db-client/dist/command/streams/WriteEventsToStream";

export interface EventstoreServiceInterface {
  deleteStream: (stream: string) => DeleteStream;
  readAllEvents: () => ReadAllEvents;
  readEventsFromStream: (stream: string) => ReadEventsFromStream;
  subscribeToAll: () => SubscribeToAll;
  subscribeToStream: (stream: string) => SubscribeToStream;
  tombstoneStream: (stream: string) => TombstoneStream;
  writeEventsToStream: (stream: string) => WriteEventsToStream;
}
