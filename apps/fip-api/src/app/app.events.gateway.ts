import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { APP } from "@fip/common";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class AppEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, APP);
    return true;
  }
}
