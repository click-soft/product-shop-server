import { Module } from '@nestjs/common';
import { AccountTempController } from './controllers/account-temp.controller';
import { AccountTempService } from './services/account-temp.service';
import { OrmModule } from 'src/orm.module';
import { AccountService } from '../account/services/account.service';
import { CsService } from '../cs/services/cs.service';
import NodeMailerService from 'src/node-mailer/node-mailer.service';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [OrmModule],
  controllers: [AccountTempController],
  providers: [
    AccountTempService,
    AccountService,
    CsService,
    NodeMailerService,
    AuthService,
    JwtService,
  ],
})
export class AccountTempModule {}
