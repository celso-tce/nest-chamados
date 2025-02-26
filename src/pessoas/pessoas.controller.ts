import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { removerSenhaPessoa } from "src/lib/utils";
import { CreatePessoaDto, UpdatePessoaDto } from "./dtos/create-pessoa.dto";
import { PessoasService } from "./pessoas.service";

@Controller('pessoas')
export class PessoasController {
  constructor(
    private readonly pessoas: PessoasService,
  ) {}

  @Post()
  create(@Body() body: CreatePessoaDto) {
    return this.pessoas.create({
      email: body.email,
      nome: body.nome,
    });
  }

  @Get()
  async findAll() {
    const pessoas = await this.pessoas.findAll();
    return pessoas.map((pessoa) => removerSenhaPessoa(pessoa));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pessoa = await this.pessoas.findOne(+id);
    return removerSenhaPessoa(pessoa);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePessoaDto,
  ) {
    return this.pessoas.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pessoas.delete(+id);
  }
}
