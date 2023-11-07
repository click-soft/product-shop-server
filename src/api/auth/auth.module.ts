import { Module } from '@nestjs/common';
import { CsModule } from '../cs/cs.module';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import AuthResolver from './resolvers/auth.resolver';
import { OrmModule } from 'src/orm.module';
import { AuthService } from './services/auth.service';
import { AccountService } from '../account/services/account.service';
import NodeMailerService from 'src/node-mailer/node-mailer.service';

@Module({
  imports: [OrmModule, CsModule, JwtConfigModule],
  providers: [AuthService, AuthResolver, AccountService, NodeMailerService],
})
export class AuthModule {}
