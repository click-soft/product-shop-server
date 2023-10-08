import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import AuthResolver from './auth.resolver';

@Module({
  imports: [
    UserModule,
    JwtConfigModule,
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule { }
