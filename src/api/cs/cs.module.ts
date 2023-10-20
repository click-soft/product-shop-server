import { Module } from '@nestjs/common';
import { CsService } from './cs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cs } from '../../entities/cpm/cs.entity';
import { CsResolver } from './cs.resolver';
import { Em } from 'src/entities/cpm/em.entity';
import { EmService } from '../em/em.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Cs, Em]),
  ],
  providers: [CsService, CsResolver, EmService],
  exports: [CsService]
})

export class CsModule { }
