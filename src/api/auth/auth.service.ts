import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import User from 'src/interfaces/user';
import LoginArgs from '../_common/dto/login.args';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async login(args: LoginArgs, res: Response) {
    const user = await this.userService.getUser({ ykiho: args.ykiho, saupkiho: args.saupkiho });

    if (!user) {
      throw new NotFoundException("사용자 정보가 존재하지 않음.")
    }

    const payload: User = {
      jisa: user.gubun,
      ykiho: user.code,
      saupkiho: user.saupnum,
      name: user.myung,
      ceoName: user.daepyo,
      fitCherbang: user.cherbang === '4',
      fitYoungsu: user.youngsu === "4"
    }

    try {
      const accessToken = await this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_SECRET') });
      res.cookie('jwt', accessToken, { httpOnly: true })

      return {
        message: 'success'
      }
    } catch (err) {
      console.log(err);

    }
  }
}