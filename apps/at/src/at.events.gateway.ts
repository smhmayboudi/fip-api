import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { AT } from "@fip/common";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class AtEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, AT);
    return true;
  }
}
