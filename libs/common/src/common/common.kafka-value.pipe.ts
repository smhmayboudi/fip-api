import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

import { CommonKafkaIncomingMessageInterface } from "./common.kafka-incoming-message.interface";

@Injectable()
export class CommonKafkaValuePipe implements PipeTransform {
  transform(
    value: CommonKafkaIncomingMessageInterface,
    _metadata: ArgumentMetadata
  ): any {
    return value.value;
  }
}
