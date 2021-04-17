import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  AuthAccessTokenResDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@fip/common";
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Headers,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth("local")
  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<AuthRefreshTokenResDto> {
    return this.authService.refreshToken(
      {
        sub,
      },
      sub
    );
  }

  @ApiBearerAuth("token")
  @Delete("logout")
  @UseGuards(AuthGuard("token"))
  async logout(
    @AppUser("sub", ParseIntPipe) sub: number,
    @Headers("token") token: string
  ): Promise<RtResDto | undefined> {
    return this.authService.deleteByToken(
      {
        token,
      },
      sub
    );
  }

  @ApiBearerAuth("telegram")
  @Post("telegram/callback")
  @UseGuards(AuthGuard("telegram"))
  async telegram(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<AuthRefreshTokenResDto> {
    return this.authService.refreshToken(
      {
        sub,
      },
      sub
    );
  }

  @ApiBearerAuth("token")
  @Post("token")
  @UseGuards(AuthGuard("token"))
  async token(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenResDto> {
    return this.authService.accessToken(
      {
        sub,
      },
      sub
    );
  }
}
