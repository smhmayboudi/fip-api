import { IsNumber } from "class-validator";

export class CommonKafkaReqDto<T = any> {
  @IsNumber()
  readonly key: number;

  readonly value: T;

  constructor(key: number, value: T) {
    this.key = key;
    this.value = value;
  }
}
