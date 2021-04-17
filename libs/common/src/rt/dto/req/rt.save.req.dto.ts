import { IsBoolean, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RtSaveReqDto {
  @ApiProperty({
    description: "The create at",
    example: 0,
  })
  @IsNumberString()
  readonly createdAt: number;

  @ApiProperty({
    description: "description of blocked",
    example: "This token is bridged.",
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: "The expire at",
    example: 0,
  })
  @IsNumberString()
  readonly expireAt: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "is blockeed",
    example: false,
  })
  @IsBoolean()
  readonly isBlocked: boolean;

  @ApiProperty({
    description: "The refresh token",
    example: 0,
  })
  @IsString()
  readonly token: string;

  @ApiProperty({
    description: "The user identification",
    example: "0",
  })
  @IsNumberString()
  readonly userId: number;

  constructor(
    createdAt: number,
    description: string,
    expireAt: number,
    id: number,
    isBlocked: boolean,
    token: string,
    userId: number
  ) {
    this.createdAt = createdAt;
    this.description = description;
    this.expireAt = expireAt;
    this.id = id;
    this.isBlocked = isBlocked;
    this.token = token;
    this.userId = userId;
  }
}
