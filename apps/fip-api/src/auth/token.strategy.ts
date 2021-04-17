import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthStrategyResDto } from "@fip/common";
import { PassportStrategy } from "@nestjs/passport";
import { RtService } from "../rt/rt.service";
import { UniqueTokenStrategy as Strategy } from "passport-unique-token";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly rtService: RtService) {
    super({
      caseSensitive: true,
      failOnMissing: true,
      passReqToCallback: false,
      rtField: "token",
      rtHeader: "token",
      rtParams: "token",
      rtQuery: "token",
    });
  }

  async validate(token: string): Promise<AuthStrategyResDto> {
    const rt = await this.rtService.validateByToken(
      {
        token,
      },
      0
    );
    if (rt === undefined || rt.expireAt < new Date().getTime()) {
      throw new UnauthorizedException();
    }
    return {
      sub: rt.userId.toString(),
    };
  }
}
