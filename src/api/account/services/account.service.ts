import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CsService } from 'src/api/cs/services/cs.service';
import SaveAccountArgs from '../dto/save-account.args';
import VerifyAccountArgs from '../dto/verify-account.args';
import { Account } from 'src/entities/cpm/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly csService: CsService,
  ) {}

  async findOne(userId: string): Promise<Account> {
    return await this.accountRepository.findOne({ where: { userId } });
  }

  async saveAccount({ userId, password }: SaveAccountArgs): Promise<Account> {
    const savedAccount = await this.findOne(userId);

    if (savedAccount) {
      throw new HttpException(
        '이미 존재하는 계정입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cs = await this.csService.getUser({ ykiho: userId });
    if (!cs) {
      throw new HttpException(
        '요양기관 정보가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const saupnumArr = cs.saupnum.match(/\d+/g);

    const account = Account.create({
      userId: userId,
      password: hashedPassword,
      saupkiho: saupnumArr?.join(''),
      ykiho: cs.code,
    });
    return await this.accountRepository.save(account);
  }

  async verifyAccount(args: VerifyAccountArgs): Promise<Account> {
    const user = await this.accountRepository.findOne({
      where: { userId: args.userId },
    });

    if (!user || !(await bcrypt.compare(args.password, user.password))) {
      throw new NotFoundException('아이디 혹은 비밀번호를 확인하세요.');
    }

    return user;
  }

  async saveRefeshToken(userId: string, refreshToken: string) {
    const account = await this.findOne(userId);
    if (account) {
      account.token = refreshToken;
      this.accountRepository.save(account);
    }
  }

  async getRefreshToken(key: string): Promise<string | undefined> {
    const account = await this.findOne(key);
    return account?.token;
  }

  async deleteRefeshToken(userId: string) {
    const account = await this.findOne(userId);
    if (account) {
      this.accountRepository.update(account.id, {
        token: null,
        expiryDate: null,
      });
    }
  }
}
