import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CsModule } from '../cs/cs.module';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import AuthResolver from './auth.resolver';
import { AccountService } from '../account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/cpm/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    CsModule,
    JwtConfigModule,
  ],
  providers: [AuthService, AuthResolver, AccountService]
})
export class AuthModule { }
