import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePessoaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;
}

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {}