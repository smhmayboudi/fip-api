import { CommonKafkaValueResDto } from "./common.kafka-value.res.dto";

export class CommonKafkaResDto<REQ = any, RES = any> {
  readonly key: number;

  readonly value: CommonKafkaValueResDto<REQ, RES>;

  constructor(key: number, value: CommonKafkaValueResDto<REQ, RES>) {
    this.key = key;
    this.value = value;
  }
}
