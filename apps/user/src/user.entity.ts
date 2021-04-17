import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

import { UserGenderType } from "@fip/common";

@Entity({ name: "users", orderBy: { id: "ASC" } })
export class UserEntity {
  @PrimaryGeneratedColumn("increment", { type: "int" })
  @IsNumberString()
  id: number;

  @Column({ length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Column({ nullable: true, type: "text" })
  @IsOptional()
  @IsString()
  biography?: string;

  @Column({ nullable: true, type: "bigint" })
  @IsNumberString()
  @IsOptional()
  birthdate?: number;

  @Column({ length: 100, nullable: true, type: "char" })
  @IsPhoneNumber("IR")
  @IsOptional()
  @IsString()
  cellphone?: string;

  @Column({ length: 200, nullable: true, type: "varchar" })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Column({ length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  firstname?: string;

  @Column({
    enum: ["female", "male"],
    enumName: "UserGenderType",
    nullable: true,
    type: "enum",
  })
  @IsEnum(UserGenderType)
  @IsOptional()
  gender?: UserGenderType;

  @Column({ length: 20, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  languageCode?: string;

  @Column({ length: 100, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  lastname?: string;

  @Column({ nullable: true, precision: 6, type: "timestamp" })
  @IsNumberString()
  @IsOptional()
  registeredAt?: number;

  @Column({ nullable: true, type: "bigint" })
  @IsNumberString()
  @IsOptional()
  telegramId?: number;

  @Column({ length: 30, nullable: true, type: "varchar" })
  @IsOptional()
  @IsString()
  username?: string;

  constructor(
    id: number,
    avatar?: string,
    biography?: string,
    birthdate?: number,
    cellphone?: string,
    email?: string,
    firstname?: string,
    gender?: UserGenderType,
    languageCode?: string,
    lastname?: string,
    registeredAt?: number,
    telegramId?: number,
    username?: string
  ) {
    this.id = id;
    this.avatar = avatar;
    this.biography = biography;
    this.birthdate = birthdate;
    this.cellphone = cellphone;
    this.email = email;
    this.firstname = firstname;
    this.gender = gender;
    this.languageCode = languageCode;
    this.lastname = lastname;
    this.registeredAt = registeredAt;
    this.telegramId = telegramId;
    this.username = username;
  }
}
