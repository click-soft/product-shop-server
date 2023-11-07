import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm.module';
import { AccountResolver } from './resolvers/account.resolver';
import { CsService } from '../cs/services/cs.service';
import { AccountService } from './services/account.service';
import NodeMailerService from 'src/node-mailer/node-mailer.service';

@Module({
  imports: [OrmModule],
  providers: [AccountResolver, AccountService, CsService, NodeMailerService],
  exports: [AccountService],
})
export class AccountModule {}
