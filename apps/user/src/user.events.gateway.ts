import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { Logger } from "@nestjs/common";
import { USER } from "@fip/common";

@WebSocketGateway()
export class UserEventsGateway {
  @SubscribeMessage("events")
  handleMessage(@MessageBody() data: unknown): boolean {
    Logger.log(`data: ${data}`, USER);
    return true;
  }
}
