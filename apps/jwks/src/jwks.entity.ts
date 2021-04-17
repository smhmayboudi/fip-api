import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "jwkss", orderBy: { id: "ASC" } })
export class JwksEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  privateKey: string;

  @Column({ type: "text" })
  publicKey: string;

  constructor(id: string, privateKey: string, publicKey: string) {
    this.id = id;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }
}
