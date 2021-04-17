import { IsString } from "class-validator";

export class AuthAccessTokenResDto {
  @IsString()
  readonly at: string;

  constructor(at: string) {
    this.at = at;
  }
}
