import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChamadosModule } from 'src/chamados/chamados.module';

@Module({
  imports: [PrismaModule, PessoasModule, ChamadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
