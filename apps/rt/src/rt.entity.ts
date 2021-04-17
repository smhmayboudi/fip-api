import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rts", orderBy: { id: "ASC" } })
export class RtEntity {
  @Column({ type: "bigint" })
  createdAt: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "bigint" })
  expireAt: number;

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "boolean" })
  isBlocked: boolean;

  @Column({ type: "int" })
  userId: number;

  @Column({ length: 256, type: "varchar" })
  token: string;

  constructor(
    createdAt: number,
    description: string,
    expireAt: number,
    id: number,
    isBlocked: boolean,
    userId: number,
    token: string
  ) {
    this.createdAt = createdAt;
    this.description = description;
    this.expireAt = expireAt;
    this.id = id;
    this.isBlocked = isBlocked;
    this.userId = userId;
    this.token = token;
  }
}
