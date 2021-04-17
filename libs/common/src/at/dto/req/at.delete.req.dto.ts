import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class AtDeleteReqDto {
  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
