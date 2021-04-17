import { ApiHideProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AtValidateReqDto {
  @ApiHideProperty()
  @IsNumber()
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
