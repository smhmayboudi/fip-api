import { ApiHideProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UserGetReqDto {
  @ApiHideProperty()
  @IsNumber()
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
