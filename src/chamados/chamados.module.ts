import { Module } from "@nestjs/common";
import { ChamadosController } from "src/chamados/chamados.controller";
import { ChamadosService } from "src/chamados/chamados.service";

@Module({
  providers: [ChamadosService],
  controllers: [ChamadosController],
})
export class ChamadosModule {}
