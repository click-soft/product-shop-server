import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateLogintokenDto from '../dto/create-login-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountTemp } from 'src/entities/cpm/account-temp.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AccountService } from 'src/api/account/services/account.service';
import { Account } from 'src/entities/cpm/account.entity';
import * as dayjs from 'dayjs';
import TokenResult from 'src/api/auth/types/token-result';
import { AuthService } from 'src/api/auth/services/auth.service';
import LoginDto from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountTempService {
  constructor(
    @InjectRepository(AccountTemp)
    private repository: Repository<AccountTemp>,
    private accountService: AccountService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  async createLoginToken({ userId, key }: CreateLogintokenDto) {
    const encKey = this.configService.get<string>('CLICK_ENC_KEY');

    if (encKey != key) {
      throw new HttpException(
        'Key가 올바르지 않습니다',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const uuid = uuidv4();
    const account: Account = await this.accountService.findOne(userId);

    if (!account) {
      throw new HttpException(
        '계정이 존재하지 않습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accountTemp = AccountTemp.create({
      accountId: account.id,
      loginToken: uuid,
      expiryDate: dayjs(new Date()).add(1, 'm').toDate(),
    });
    await this.repository.upsert(accountTemp, {
      conflictPaths: ['accountId'],
    });
    // await this.repository.save(accountTemp);
    // await accountTemp.save();

    return accountTemp.loginToken;
  }

  async login({ userId, token }: LoginDto): Promise<TokenResult> {
    const account: Account = await this.accountService.findOne(userId);
    if (!account) {
      throw new HttpException('계정 정보가 없습니다.', HttpStatus.UNAUTHORIZED);
    }

    const accountTemp = await this.repository.findOne({
      where: {
        accountId: account.id,
        loginToken: token,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });

    if (!accountTemp) {
      throw new HttpException(
        '로그인 할 수 없습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.authService.createTokens(account);
  }
}
