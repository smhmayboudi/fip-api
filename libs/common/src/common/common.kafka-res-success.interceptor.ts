import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { CommonKafkaResDto } from "./dto";
import { KafkaContext } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CommonKafkaResSuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<CommonKafkaResDto> {
    const rpc = context.switchToRpc();
    const kafkaContext = rpc.getContext<KafkaContext>();
    const message = kafkaContext.getMessage();
    return next.handle().pipe(
      map((value) => ({
        key: parseInt(message.key.toString(), 10),
        value: {
          err: undefined,
          req: message.value,
          res:
            value === undefined
              ? undefined
              : {
                  ...value,
                },
        },
      }))
    );
  }
}
