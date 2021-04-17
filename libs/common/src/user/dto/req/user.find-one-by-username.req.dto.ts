import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserFindOneByUsernameReqDto {
  @ApiProperty({
    description: "The username",
    example: "abcdef",
  })
  @IsString()
  readonly username: string;

  constructor(username: string) {
    this.username = username;
  }
}
