import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePessoaDto, UpdatePessoaDto } from "./dtos/create-pessoa.dto";

@Injectable()
export class PessoasService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(data: CreatePessoaDto) {
    return this.prisma.pessoa.create({ data });
  }

  findAll() {
    return this.prisma.pessoa.findMany();
  }

  findOne(id: number) {
    return this.prisma.pessoa.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdatePessoaDto) {
    return this.prisma.pessoa.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.pessoa.delete({
      where: { id },
    });
  }
}
