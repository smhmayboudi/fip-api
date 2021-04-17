import { AuthStrategyResDto, AuthTelegramPayloadReqDto } from "@fip/common";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { AuthConfigService } from "./auth.config.service";
import { PassportStrategy } from "@nestjs/passport";
import { TelegramStrategy as Strategy } from "passport-telegram-official";
import { UserService } from "../user/user.service";

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authConfigService: AuthConfigService,
    private readonly userService: UserService
  ) {
    super({
      botToken: authConfigService.telegramBotToken,
      passReqToCallback: false,
      queryExpiration: authConfigService.telegramQueryExpiration / 1000,
    });
  }

  async validate(dto: AuthTelegramPayloadReqDto): Promise<AuthStrategyResDto> {
    const user = await this.userService.findOneByTelegramId(
      {
        telegramId: dto.id,
      },
      0
    );
    if (user === undefined) {
      // throw new UnauthorizedException();
      const newUser = await this.userService.save(
        {
          id: 0,
          telegramId: dto.id,
        },
        0
      );
      if (newUser === undefined) {
        throw new InternalServerErrorException();
      }
      return {
        sub: newUser.id.toString(),
      };
    }
    return {
      sub: user.id.toString(),
    };
  }
}
