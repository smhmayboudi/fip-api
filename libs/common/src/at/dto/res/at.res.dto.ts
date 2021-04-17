import { IsNumberString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class AtResDto {
  @ApiProperty({
    description: "The count",
    example: "0",
  })
  @IsNumberString()
  readonly count: number;

  @ApiProperty({
    description: "The create at",
    example: 0,
  })
  @IsNumberString()
  readonly createdAt: number;

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
    description: "The token",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly token: string;

  @ApiProperty({
    description: "The user identification",
    example: "0",
  })
  @IsNumberString()
  readonly userId: number;

  constructor(
    count: number,
    createdAt: number,
    expireAt: number,
    id: number,
    token: string,
    userId: number
  ) {
    this.count = count;
    this.createdAt = createdAt;
    this.expireAt = expireAt;
    this.id = id;
    this.token = token;
    this.userId = userId;
  }
}
