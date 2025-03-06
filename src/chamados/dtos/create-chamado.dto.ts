import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChamadoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descricao?: string;

  @IsInt()
  pessoaId: number;
}
