import {
  CLOSE_EVENT,
  CONFIRMATION_EVENT,
  END_EVENT,
  ERROR_EVENT,
  EVENT_EVENT,
  EventData,
  EventStoreConnection,
  ResolvedEvent,
  SubscriptionReport,
} from "@eventstore/db-client";
import {
  EVENTSTORE_INSTANCE_TOKEN,
  EVENTSTORE_MODULE_OPTIONS,
} from "./eventstore.constant";
import {
  EventHandler,
  EventstoreModuleOptions,
  IEventstore,
} from "./eventstore.module.interface";
import { IEventPublisher, IMessageSource } from "@nestjs/cqrs";
import { Inject, Injectable, Logger } from "@nestjs/common";

import { EventstoreService } from "./eventstore.service";
import { Subject } from "rxjs";
import { inspect } from "util";

@Injectable()
export class EventstorePubSub
  implements IEventPublisher<IEventstore>, IMessageSource<IEventstore> {
  constructor(
    @Inject(EVENTSTORE_INSTANCE_TOKEN)
    private readonly eventStoreConnection: EventStoreConnection,
    @Inject(EVENTSTORE_MODULE_OPTIONS)
    private readonly eventstoreModuleOptions: EventstoreModuleOptions,
    private readonly eventstoreService: EventstoreService
  ) {}

  private close(): void {
    Logger.log("close", this.eventstoreModuleOptions.loggerContext);
  }

  private confirmation(): void {
    Logger.log("confirmation", this.eventstoreModuleOptions.loggerContext);
  }

  private end(): void {
    Logger.log("end", this.eventstoreModuleOptions.loggerContext);
  }

  private error(error: Error): void {
    Logger.error(error, undefined, this.eventstoreModuleOptions.loggerContext);
  }

  private event<T extends IEventstore>(
    event: ResolvedEvent,
    _report: SubscriptionReport,
    subject: Subject<T>
  ): void {
    Logger.log(
      `event ${inspect(event)}`,
      this.eventstoreModuleOptions.loggerContext
    );
    if (event.event !== undefined) {
      const newEvent = event.event;
      this.eventstoreModuleOptions.eventHandlers
        .filter((value: EventHandler) => value.eventType === newEvent.eventType)
        .forEach((value: EventHandler) =>
          subject.next(value.eventBuilder(newEvent.data) as any)
        );
    }
  }

  async bridgeEventsTo<T extends IEventstore>(
    subject: Subject<T>
  ): Promise<any> {
    Logger.log("bridgeEventsTo", this.eventstoreModuleOptions.loggerContext);
    const event = await this.eventstoreService
      .subscribeToStream(this.eventstoreModuleOptions.stream)
      .execute(this.eventStoreConnection);
    event
      .on(CLOSE_EVENT, this.close.bind(this))
      .on(CONFIRMATION_EVENT, this.confirmation.bind(this))
      .on(END_EVENT, this.end.bind(this))
      .on(ERROR_EVENT, this.error.bind(this))
      .on(EVENT_EVENT, (event: ResolvedEvent, report: SubscriptionReport) =>
        this.event(event, report, subject)
      );
  }

  async publish<T extends IEventstore>(event: T): Promise<any> {
    Logger.log(
      `publish ${inspect(event)}`,
      this.eventstoreModuleOptions.loggerContext
    );
    const newEvent = (event as unknown) as IEventstore;
    const eventData = EventData.json(newEvent.eventType, newEvent.data).build();
    await this.eventstoreService
      .writeEventsToStream(this.eventstoreModuleOptions.stream)
      .send(eventData)
      .execute(this.eventStoreConnection);
  }

  async publishAll<T extends IEventstore>(events: T[]): Promise<any> {
    Logger.log(
      `publishAll ${inspect(events)}`,
      this.eventstoreModuleOptions.loggerContext
    );
    const eventDatas = events.map((value: T) => {
      const newEvent = (value as unknown) as IEventstore;
      const eventData = EventData.json(
        newEvent.eventType,
        newEvent.data
      ).build();
      return eventData;
    });
    await this.eventstoreService
      .writeEventsToStream(this.eventstoreModuleOptions.stream)
      .send(...eventDatas)
      .execute(this.eventStoreConnection);
  }
}
