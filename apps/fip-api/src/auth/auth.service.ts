import { ApmAfterMethod, ApmBeforeMethod } from "@fip/apm";
import {
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@fip/common";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { JwksService } from "../jwks/jwks.service";
import { JwtService } from "@nestjs/jwt";
import { PromMethodCounter } from "@fip/prom";
import { RtService } from "../rt/rt.service";
import cryptoRandomString from "crypto-random-string";
import { v4 as uuidv4 } from "uuid";

@Injectable()
// @PromInstanceCounter
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwksService: JwksService,
    private readonly jwtService: JwtService,
    private readonly rtService: RtService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async accessToken(
    dto: AuthAccessTokenReqDto,
    sub: number
  ): Promise<AuthAccessTokenResDto> {
    const jwks = await this.jwksService.getOneRandom({}, sub);
    if (jwks === undefined) {
      throw new InternalServerErrorException();
    }
    const jwtid = uuidv4();
    const at = this.jwtService.sign(
      {},
      {
        jwtid,
        keyid: jwks.id,
        subject: dto.sub.toString(),
      }
    );
    return {
      at,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: AuthDeleteByTokenReqDto,
    sub: number
  ): Promise<RtResDto | undefined> {
    return await this.rtService.deleteByToken(dto, sub);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async refreshToken(
    dto: AuthRefreshTokenReqDto,
    sub: number
  ): Promise<AuthRefreshTokenResDto> {
    const jwks = await this.jwksService.getOneRandom({}, sub);
    if (jwks === undefined) {
      throw new InternalServerErrorException();
    }
    const jwtid = dto.jwtid || uuidv4();
    const at = this.jwtService.sign(
      {},
      {
        jwtid,
        keyid: jwks.id,
        subject: dto.sub.toString(),
      }
    );
    const now = dto.now || new Date().getTime();
    const exp = now + this.authConfigService.jwtRefreshTokenExpiresIn;
    const rt =
      dto.rt ||
      cryptoRandomString({
        length: 256,
        type: "base64",
      });
    await this.rtService.save(
      {
        createdAt: now,
        description: "",
        expireAt: exp,
        id: 0,
        isBlocked: false,
        token: rt,
        userId: dto.sub,
      },
      sub
    );
    return {
      at,
      rt,
    };
  }
}
