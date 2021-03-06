import * as express from "express";

import {
  BadRequestException,
  ExecutionContext,
  PipeTransform,
  Type,
  createParamDecorator,
} from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "@fip/common";

export const AppUser: (
  ...dataOrPipes: (string | PipeTransform | Type<PipeTransform>)[]
) => ParameterDecorator = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    if (request.user === undefined) {
      throw new BadRequestException();
    }
    return data === undefined || typeof data !== "string"
      ? request.user
      : request.user[data];
  }
);
