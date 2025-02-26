import { Module } from "@nestjs/common";
import { PessoasController } from "./pessoas.controller";
import { PessoasService } from "./pessoas.service";

@Module({
  providers: [PessoasService],
  controllers: [PessoasController],
})
export class PessoasModule {}
