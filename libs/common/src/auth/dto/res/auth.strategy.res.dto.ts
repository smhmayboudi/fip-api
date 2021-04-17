import { IsString } from "class-validator";

export class AuthStrategyResDto {
  @IsString()
  readonly sub: string;

  constructor(sub: string) {
    this.sub = sub;
  }
}
