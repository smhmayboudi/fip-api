import { IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class JwksResDto {
  @ApiProperty({
    description: "The identification",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly id: string;

  @ApiProperty({
    description: "The private key",
    example: `
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
`,
  })
  @Exclude()
  @IsString()
  readonly privateKey: string;

  @ApiProperty({
    description: "The public key",
    example: `
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
`,
  })
  @IsString()
  readonly publicKey: string;

  constructor(id: string, privateKey: string, publicKey: string) {
    this.id = id;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }
}
