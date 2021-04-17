import {
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@fip/common";

export interface AuthServiceInterface {
  accessToken: (
    dto: AuthAccessTokenReqDto,
    sub: number
  ) => Promise<AuthAccessTokenResDto>;
  deleteByToken: (
    dto: AuthDeleteByTokenReqDto,
    sub: number
  ) => Promise<RtResDto | undefined>;
  refreshToken: (
    dto: AuthRefreshTokenReqDto,
    sub: number
  ) => Promise<AuthRefreshTokenResDto>;
}
