import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Status } from "@prisma/client";
import { CreateChamadoDto } from "src/chamados/dtos/create-chamado.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChamadosService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(dto: CreateChamadoDto) {
    return this.prisma.chamado.create({
      data: {
        titulo: dto.titulo,
        descricao: dto.descricao,
        pessoaId: dto.pessoaId,
        status: 'ABERTO',
      },
    });
  }

  avancar(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const chamado = await tx.chamado.findUnique({
        where: { id },
        select: {
          status: true,
        },
      });

      if (chamado === null) {
        throw new NotFoundException(`Não existe chamado com esse ID!`);
      }

      const status = chamado.status;

      if (status === 'CONCLUIDO') {
        throw new BadRequestException(`Não é possível avançar um chamado já concluido.`);
      }

      let novoStatus: Status = status;

      if (status === 'ABERTO')            novoStatus = 'EM_ANDAMENTO';
      else if (status === 'EM_ANDAMENTO') novoStatus = 'CONCLUIDO';
      else if (status === 'CANCELADO')    novoStatus = 'ABERTO';

      return tx.chamado.update({
        where: { id },
        data: {
          status: novoStatus,
        }
      });
    });
  }

  cancelar(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const chamado = await tx.chamado.findUnique({
        where: { id },
        select: {
          status: true,
        },
      });

      if (chamado === null) {
        throw new NotFoundException(`Não existe chamado com esse ID!`);
      }

      if (chamado.status === 'CANCELADO') {
        throw new BadRequestException(`Já está cancelado!`);
      }

      return tx.chamado.update({
        where: { id },
        data: {
          status: 'CANCELADO',
        },
      });
    });
  }

  apagar(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const chamado = await tx.chamado.findUnique({
        where: { id },
        select: {
          status: true,
          pessoaId: true,
        },
      });

      if (chamado === null) {
        throw new NotFoundException(`Não existe chamado com esse ID!`);
      }

      if (chamado.status !== 'CANCELADO') {
        throw new BadRequestException(`Não é possível apagar um chamado com status diferente de "CANCELADO".`);
      }

      return tx.chamado.delete({
        where: { id },
      });
    });
  }

  findAll(
    status?: Status,
    pessoaId?: number,
  ) {
    return this.prisma.chamado.findMany({
      where: {
        status,
        pessoaId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.chamado.findUnique({
      where: { id },
    });
  }
}
