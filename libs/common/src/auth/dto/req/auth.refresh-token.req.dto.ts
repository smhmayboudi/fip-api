import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsUUID } from "class-validator";

export class AuthRefreshTokenReqDto {
  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  @ApiProperty({
    description: "The jwtid",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsOptional()
  @IsUUID()
  readonly jwtid?: string;

  @ApiProperty({
    description: "The now",
    example: 0,
  })
  @IsNumberString()
  @IsOptional()
  readonly now?: number;

  @ApiProperty({
    description: "The refresh token",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsOptional()
  @IsUUID()
  readonly rt?: string;

  constructor(sub: number, jwtid?: string, now?: number, rt?: string) {
    this.sub = sub;
    this.jwtid = jwtid;
    this.now = now;
    this.rt = rt;
  }
}
