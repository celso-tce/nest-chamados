import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Status } from "@prisma/client";
import { ChamadosService } from "src/chamados/chamados.service";
import { CreateChamadoDto } from "src/chamados/dtos/create-chamado.dto";

@Controller('chamados')
export class ChamadosController {
  constructor(
    private chamados: ChamadosService,
  ) {}

  @Post()
  create(@Body() dto: CreateChamadoDto) {
    return this.chamados.create(dto);
  }

  @Patch(':id/avancar')
  avancar(@Param('id') id: string) {
    return this.chamados.avancar(+id);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.chamados.cancelar(+id);
  }

  @Get()
  findAll(
    @Query('pessoaId') pessoaId?: string,
    @Query('status') status?: string,
  ) {
    return this.chamados.findAll(
      status as Status,
      pessoaId ? +pessoaId : undefined,
    );
  }

  @Delete(':id')
  apagar(@Param('id') id: string) {
    return this.chamados.apagar(+id);
  }
}
