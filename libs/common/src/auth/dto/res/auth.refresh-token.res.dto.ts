import { IsString } from "class-validator";

export class AuthRefreshTokenResDto {
  @IsString()
  readonly at: string;

  @IsString()
  readonly rt: string;

  constructor(at: string, rt: string) {
    this.at = at;
    this.rt = rt;
  }
}
