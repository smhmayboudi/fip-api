import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { UserGenderType } from "../../user.gender.type";

export class UserEditReqDto {
  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The avatar link",
    example: "http://...",
  })
  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @ApiProperty({
    description: "Small description of user",
    example: "He tries to bridge the system.",
  })
  @IsOptional()
  @IsString()
  readonly biography?: string;

  @ApiProperty({
    description: "The birthdate",
    example: 0,
  })
  @IsNumberString()
  @IsOptional()
  readonly birthdate?: number;

  @ApiProperty({
    description: "The cellphone number",
    example: 9121234567,
  })
  @IsPhoneNumber("IR")
  @IsOptional()
  @IsString()
  readonly cellphone?: string;

  @ApiProperty({
    description: "The email",
    example: "smhmayboudi@gmail.com",
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    description: "The firstname",
    example: "Hossein",
  })
  @IsOptional()
  @IsString()
  readonly firstname?: string;

  @ApiProperty({
    description: "The gender",
    enum: ["female", "male"],
    example: UserGenderType.male,
  })
  @IsEnum(UserGenderType)
  @IsOptional()
  readonly gender?: UserGenderType;

  @ApiProperty({
    description: "The language",
    example: "en",
  })
  @IsOptional()
  @IsString()
  readonly languageCode?: string;

  @ApiProperty({
    description: "The lastname",
    example: "Mayboudi",
  })
  @IsOptional()
  @IsString()
  readonly lastname?: string;

  @ApiProperty({
    description: "The registered at",
    example: 0,
  })
  @IsNumberString()
  @IsOptional()
  readonly registeredAt?: number;

  @ApiProperty({
    description: "The telegram identification",
    example: "@smhmayboudi",
  })
  @IsNumberString()
  @IsOptional()
  readonly telegramId?: number;

  @ApiProperty({
    description: "The username",
    example: "smhmayboudi",
  })
  @IsOptional()
  @IsString()
  readonly username?: string;

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
