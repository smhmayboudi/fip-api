import { ApiHideProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AuthAccessTokenReqDto {
  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  constructor(sub: number) {
    this.sub = sub;
  }
}
