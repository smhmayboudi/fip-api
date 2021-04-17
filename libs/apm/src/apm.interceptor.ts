import * as express from "express";

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { ApmService } from "./apm.service";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";

@Injectable()
export class ApmInterceptor implements NestInterceptor {
  constructor(private readonly apmService: ApmService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & {
        user: {
          sub: string;
        };
      }
    >();
    if (this.apmService.isStarted()) {
      this.apmService.setUserContext({
        id: request.user.sub,
      });
    }
    return next.handle().pipe(
      catchError((error) => {
        if (this.apmService.isStarted()) {
          this.apmService.captureError(error);
        }
        return throwError(error);
      })
    );
  }
}
