import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CsService } from 'src/api/cs/services/cs.service';
import { AccountService } from 'src/api/account/services/account.service';
import TokenResult from '../types/token-result';
import LoginArgs from 'src/api/_common/dto/login.args';
import { User } from '../types/user';

@Injectable()
export class AuthService {
  constructor(
    private csService: CsService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly accountService: AccountService,
  ) {}

  async login(args: LoginArgs): Promise<TokenResult> {
    const account = await this.accountService.verifyAccount(args);
    if (!account) {
      throw new NotFoundException('아이디 혹은 비밀번호를 확인하세요.');
    }

    const cs = await this.csService.getUser({
      ykiho: account.ykiho,
      saupkiho: account.saupkiho,
    });
    const payload = this.csService.convertCsToUser({
      cs: cs,
      admin: account.admin,
    });

    try {
      const accessToken = await this.createAccessToken(payload);
      const refreshToken = await this.createRefeshToken(payload);

      this.accountService.saveRefeshToken(payload.ykiho, refreshToken);

      return {
        accessToken,
        usr: payload.ykiho,
        admin: payload.admin,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async logout(userId: string) {
    await this.accountService.deleteRefeshToken(userId);
  }

  async createAccessToken(payload: User) {
    return await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });
  }

  async createRefeshToken(payload: User) {
    return await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_RF_SECRET'),
      expiresIn: this.configService.get<string>('JWT_RF_EXPIRES_IN'),
    });
  }

  async refresh(key: string): Promise<TokenResult> {
    const refreshToken = await this.accountService.getRefreshToken(key);
    console.log(key);

    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_RF_SECRET'),
      });

      const { iat, exp, ...accessPayload } = payload;
      const accessToken = await this.createAccessToken(accessPayload);

      return {
        accessToken,
        usr: key,
      };
    } catch (err) {
      return undefined;
    }
  }
}