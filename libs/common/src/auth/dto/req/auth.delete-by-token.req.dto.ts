import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class AuthDeleteByTokenReqDto {
  @ApiProperty({
    description: "The token",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
