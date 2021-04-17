import * as express from "express";

import { AuthJwtPayloadReqDto, AuthStrategyResDto } from "@fip/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";

import { AtService } from "../at/at.service";
import { AuthConfigService } from "./auth.config.service";
import { JwksService } from "../jwks/jwks.service";
import { PassportStrategy } from "@nestjs/passport";
import { RtService } from "../rt/rt.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly atService: AtService,
    protected readonly authConfigService: AuthConfigService,
    protected readonly jwksService: JwksService,
    private readonly rtService: RtService
  ) {
    super({
      algorithms: "RS256",
      jsonWebTokenOptions: {
        algorithms: "RS256",
      },
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        authConfigService.jwtAuhSchema
      ),
      passReqToCallback: false,
      secretOrKeyProvider: async function (
        _request: express.Request,
        rawJwtToken: string,
        done: (error: Error | null, publicKey: string | null) => void
      ) {
        try {
          const rawJwtTokenSpluts = rawJwtToken.split(".");
          const kid = JSON.parse(
            Buffer.from(rawJwtTokenSpluts[0], "base64").toString("ascii")
          ).kid;
          const sub = JSON.parse(
            Buffer.from(rawJwtTokenSpluts[1], "base64").toString("ascii")
          ).sub;
          const jwks = await jwksService.findOne(
            {
              id: kid,
            },
            sub
          );
          if (jwks === undefined) {
            done(new Error("jwt.strategy secretOrKeyProvider failed."), null);
          } else {
            done(null, jwks.publicKey);
          }
        } catch (error) {
          done(error, null);
        }
      },
    });
  }

  async validate(dto: AuthJwtPayloadReqDto): Promise<AuthStrategyResDto> {
    const sub = parseInt(dto.sub, 10);
    const rt = await this.rtService.validate(
      {
        userId: sub,
      },
      sub
    );
    if (rt === undefined) {
      throw new UnauthorizedException();
    }
    const at = await this.atService.validateByToken(
      {
        token: dto.jti,
      },
      sub
    );
    if (
      at !== undefined &&
      this.authConfigService.jwtAccessTokenExpiresCount < at.count
    ) {
      throw new UnauthorizedException();
    }
    if (at !== undefined) {
      const atS = await this.atService.update(
        {
          ...at,
          count: at.count + 1,
        },
        sub
      );
      if (atS === undefined) {
        throw new InternalServerErrorException(
          "The record has been deleted 1."
        );
      }
    } else {
      const atS = await this.atService.save(
        {
          count: 0,
          createdAt: 1000 * dto.iat,
          expireAt: 1000 * dto.exp,
          id: 0,
          token: dto.jti,
          userId: sub,
        },
        sub
      );
      if (atS === undefined) {
        throw new InternalServerErrorException(
          "The record has been deleted 2."
        );
      }
    }
    return Promise.resolve({
      sub: dto.sub,
    });
  }
}
