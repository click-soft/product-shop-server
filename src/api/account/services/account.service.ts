import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CsService } from 'src/api/cs/services/cs.service';
import SaveAccountArgs from '../dto/save-account.args';
import VerifyAccountArgs from '../dto/verify-account.args';
import { Account } from 'src/entities/cpm/account.entity';
import SendChangePasswordEmail from '../dto/send_change_password_email.args';
import { v4 as uuidv4 } from 'uuid';
import NodeMailerService from 'src/node-mailer/node-mailer.service';
import { ValidChangePasswordArgs } from '../dto/valid-change-password.args';
import ChangePasswordArgs from '../dto/change-password.args';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly csService: CsService,
    private nodeMailerService: NodeMailerService,
  ) {}

  async findOne(userId: string): Promise<Account> {
    return await this.accountRepository.findOne({ where: { userId } });
  }

  private getUserArgsById(id: string) {
    switch (id.length) {
      case 8:
        return { ykiho: id };
      case 10:
        return { saupkiho: id };
    }
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async saveAccount({
    userId,
    password,
    email,
  }: SaveAccountArgs): Promise<Account> {
    const savedAccount = await this.findOne(userId);

    if (savedAccount) {
      throw new HttpException(
        '이미 존재하는 계정입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userArgs = this.getUserArgsById(userId);
    const cs = await this.csService.getUser(userArgs);
    if (!cs) {
      throw new HttpException(
        '클릭소프트에 등록된 정보가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await this.hashPassword(password);
    const saupnumArr = cs.saupnum.match(/\d+/g);

    const account = Account.create({
      userId,
      password: hashedPassword,
      email,
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
      return await this.accountRepository.save(account);
    }
    throw new NotFoundException('계정 정보가 없습니다.');
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

  async sendChangePasswordEmail(
    args: SendChangePasswordEmail,
  ): Promise<string> {
    const { userId } = args;
    const account = await this.accountRepository.findOne({ where: { userId } });

    if (!account) {
      throw new HttpException(
        '계정 정보가 존재하지 않습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const uuid = uuidv4();
    await this.saveRefeshToken(userId, uuid);
    await this.nodeMailerService.sendChangePasswordEmail({
      userId,
      email: account.email,
      token: uuid,
    });

    return account.email;
  }

  async validChangePassword({ userId, token }: ValidChangePasswordArgs) {
    return await this.accountRepository.exist({ where: { userId, token } });
  }

  async changePassword({
    userId,
    password,
  }: ChangePasswordArgs): Promise<UpdateResult> {
    const hashedPassword = await this.hashPassword(password);
    return await this.accountRepository
      .createQueryBuilder()
      .update(Account)
      .set({
        password: hashedPassword,
        token: null,
      })
      .where('user_id = :userId ', { userId })
      .execute();
  }
}
