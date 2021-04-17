import { IsString } from "class-validator";

export class CommonKafkaValueResDto<RES = any, REQ = any> {
  @IsString()
  readonly err?: string;

  readonly req?: REQ;

  readonly res?: RES;

  constructor(err: string, req: REQ, res: RES) {
    this.err = err;
    this.req = req;
    this.res = res;
  }
}
