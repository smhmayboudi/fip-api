import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class UserFindOneByTelegramIdReqDto {
  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly telegramId: number;

  constructor(telegramId: number) {
    this.telegramId = telegramId;
  }
}
