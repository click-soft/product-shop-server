import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm.module';
import { CsService } from './services/cs.service';
import { CsResolver } from './resolvers/cs.resolver';
import { EmService } from '../em/services/em.service';

@Module({
  imports: [OrmModule],
  providers: [CsService, CsResolver, EmService],
  exports: [CsService],
})
export class CsModule {}
