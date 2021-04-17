import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserEditReqDto, UserFindReqDto, UserResDto } from "@fip/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@ApiBearerAuth("jwt")
@ApiTags("user")
@Controller("user")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put("profile")
  async edit(
    @Body() dto: UserEditReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<UserResDto | undefined> {
    return this.userService.edit(
      {
        ...dto,
        id: sub,
      },
      sub
    );
  }

  @Get()
  async find(
    dto: UserFindReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<UserResDto[] | undefined> {
    return this.userService.find(dto, sub);
  }

  @Get("profile")
  async get(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<UserResDto | undefined> {
    return this.userService.get(
      {
        id: sub,
      },
      sub
    );
  }
}
