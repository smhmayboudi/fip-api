import { IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RtBlockByTokenReqDto {
  @ApiProperty({
    description: "description of blocked",
    example: "This token is bridged.",
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: "The token",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly token: string;

  constructor(description: string, token: string) {
    this.description = description;
    this.token = token;
  }
}
