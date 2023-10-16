import { Module } from '@nestjs/common';
import { CsService } from './cs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cs } from '../../entities/cpm/cs.entity';
import { CsResolver } from './cs.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([Cs]),
  ],
  providers: [CsService, CsResolver],
  exports: [CsService]
})

export class CsModule { }
