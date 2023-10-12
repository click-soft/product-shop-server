import { Injectable, NotFoundException } from '@nestjs/common';
import VerifyAccountArgs from './dto/verify-account.args';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/cpm/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/types/user';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) { }

  async findOne(userId: string): Promise<Account> {
    return await this.accountRepository.findOne({ where: { userId } })
  }

  async verifyAccount(args: VerifyAccountArgs): Promise<Account> {
    const user = await this.accountRepository.findOne({ where: { userId: args.userId } })

    if (!user || user.password !== args.password) {
      throw new NotFoundException("아이디 혹은 비밀번호를 확인하세요.");
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

  async getRefreshToken(key: string): Promise<string> {
    const account = await this.findOne(key);
    return account.token;
  }

  async deleteRefeshToken(userId: string) {
    const account = await this.findOne(userId);
    if (account) {
      this.accountRepository.update(account.id, { token: null, expiryDate: null });
    }
  }
}
