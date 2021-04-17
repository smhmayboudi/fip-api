import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class AuthJwtPayloadReqDto {
  @ApiProperty({
    description: "The exp",
    example: 0,
  })
  @IsNumberString()
  readonly exp: number;

  @ApiProperty({
    description: "The iat",
    example: 0,
  })
  @IsNumberString()
  readonly iat: number;

  @ApiProperty({
    description: "The jti",
    example: "0",
  })
  @IsString()
  readonly jti: string;

  @ApiHideProperty()
  @IsString()
  readonly sub: string;

  constructor(exp: number, iat: number, jti: string, sub: string) {
    this.exp = exp;
    this.iat = iat;
    this.jti = jti;
    this.sub = sub;
  }
}
