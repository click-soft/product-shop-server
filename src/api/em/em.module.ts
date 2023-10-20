import { Module } from '@nestjs/common';
import { EmService } from './em.service';
import { EmResolver } from './em.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Em } from 'src/entities/cpm/em.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Em])],
  providers: [EmResolver, EmService, JwtService],
  exports: [EmService]
})
export class EmModule { }
