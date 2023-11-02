import { Module } from '@nestjs/common';
import { EmResolver } from './resolvers/em.resolver';
import { JwtService } from '@nestjs/jwt';
import { OrmModule } from 'src/orm.module';
import { EmService } from './services/em.service';

@Module({
  imports: [OrmModule],
  providers: [EmResolver, EmService, JwtService],
  exports: [EmService],
})
export class EmModule {}
