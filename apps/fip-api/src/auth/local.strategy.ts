import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthStrategyResDto } from "@fip/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      passReqToCallback: false,
      passwordField: "password",
      session: false,
      usernameField: "username",
    });
  }

  async validate(
    username: string,
    _password: string
  ): Promise<AuthStrategyResDto> {
    const user = await this.userService.findOneByUsername(
      {
        username,
      },
      0
    );
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    return {
      sub: user.id.toString(),
    };
  }
}
