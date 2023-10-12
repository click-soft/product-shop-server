import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import LoginArgs from '../_common/dto/login.args';
import { AccountService } from '../account/account.service';
import TokenResult from './types/token-result';
import { User } from './types/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly accountService: AccountService,
  ) { }

  async login(args: LoginArgs): Promise<TokenResult> {
    const cs = await this.userService.getUser({ ykiho: args.ykiho, saupkiho: args.saupkiho });

    if (!cs) {
      throw new NotFoundException("사용자 정보가 존재하지 않음.")
    }

    const payload = this.userService.convertCsToUser(cs);

    try {
      const accessToken = await this.createAccessToken(payload);
      const refreshToken = await this.createRefeshToken(payload);

      this.accountService.saveRefeshToken(payload.ykiho, refreshToken);

      return {
        accessToken,
        usr: payload.ykiho,
      }
    } catch (err) {
      throw new UnauthorizedException()
    }
  }

  async logout(userId: string) {
    await this.accountService.deleteRefeshToken(userId);
  }

  async createAccessToken(payload: User) {
    return await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get<string>("JWT_EXPIRES_IN")
    });
  }

  async createRefeshToken(payload: User) {
    return await this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_RF_SECRET'),
      expiresIn: this.configService.get<string>("JWT_RF_EXPIRES_IN")
    });

  }

  async refresh(key: string): Promise<TokenResult> {
    const refreshToken = await this.accountService.getRefreshToken(key);
    console.log(key);

    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>("JWT_RF_SECRET")
      });

      const { iat, exp, ...accessPayload } = payload;
      const accessToken = await this.createAccessToken(accessPayload);

      return {
        accessToken,
        usr: key,
      }
    } catch (err) {
      return undefined
    }
  }
}