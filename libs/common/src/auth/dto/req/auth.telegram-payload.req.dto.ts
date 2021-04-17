import { IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class AuthTelegramPayloadReqDto {
  @ApiProperty({
    description: "The auth at",
    example: 0,
  })
  @IsNumberString()
  readonly authAt: number;

  @ApiProperty({
    description: "The first name",
    example: "Hossein",
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    description: "The hash",
    example: "0x00",
  })
  @IsString()
  readonly hash: string;

  @ApiProperty({
    description: "The identification",
    example: 0,
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The last name",
    example: "Mayboudi",
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: "The photo url",
    example: "http://...",
  })
  @IsString()
  readonly photoUrl: string;

  @ApiProperty({
    description: "The username",
    example: "smhmayboudi",
  })
  @IsString()
  readonly username: string;

  constructor(
    authAt: number,
    firstName: string,
    hash: string,
    id: number,
    lastName: string,
    photoUrl: string,
    username: string
  ) {
    this.authAt = authAt;
    this.firstName = firstName;
    this.hash = hash;
    this.id = id;
    this.lastName = lastName;
    this.photoUrl = photoUrl;
    this.username = username;
  }
}
