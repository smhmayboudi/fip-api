import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ats", orderBy: { id: "ASC" } })
export class AtEntity {
  @Column({ type: "tinyint" })
  count: number;

  @Column({ type: "bigint" })
  createdAt: number;

  @Column({ type: "bigint" })
  expireAt: number;

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ type: "int" })
  userId: number;

  @Column({ length: 512, type: "varchar" })
  token: string;

  constructor(
    count: number,
    createdAt: number,
    expireAt: number,
    id: number,
    userId: number,
    token: string
  ) {
    this.count = count;
    this.createdAt = createdAt;
    this.expireAt = expireAt;
    this.id = id;
    this.userId = userId;
    this.token = token;
  }
}
