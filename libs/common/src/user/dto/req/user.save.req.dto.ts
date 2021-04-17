import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class UserSaveReqDto {
  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The telegram identification",
    example: "0",
  })
  @IsNumberString()
  readonly telegramId: number;

  constructor(id: number, telegramId: number) {
    this.id = id;
    this.telegramId = telegramId;
  }
}
