import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, of } from "rxjs";

import { CommonKafkaResDto } from "./dto";
import { KafkaContext } from "@nestjs/microservices";
import { catchError } from "rxjs/operators";

@Injectable()
export class CommonKafkaResFailureInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<CommonKafkaResDto> {
    const rpc = context.switchToRpc();
    const kafkaContext = rpc.getContext<KafkaContext>();
    const message = kafkaContext.getMessage();
    return next.handle().pipe(
      catchError((error) =>
        of({
          key: parseInt(message.key.toString(), 10),
          value: {
            err: error.message,
            req: message.value,
            res: undefined,
          },
        })
      )
    );
  }
}
