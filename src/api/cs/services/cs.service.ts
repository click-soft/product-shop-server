import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cs } from 'src/entities/cpm/cs.entity';
import { User } from 'src/api/auth/types/user';
import { Account } from 'src/entities/cpm/account.entity';

@Injectable()
export class CsService {
  constructor(
    @InjectRepository(Cs)
    private csRepository: Repository<Cs>,
  ) {}

  async getUser({
    ykiho,
    saupkiho,
  }: {
    ykiho?: string;
    saupkiho?: string;
  }): Promise<Cs> {
    if (ykiho) {
      if (ykiho?.length !== 8) {
        throw new BadRequestException('요양기호가 올바르지 않음');
      }
    } else if (saupkiho) {
      if (saupkiho?.length !== 10) {
        throw new BadRequestException('사업자코드가 올바르지 않음');
      }
    }

    const result = await this.csRepository.findOne({
      select: {
        jisa: true,
        code: true,
        myung: true,
        daepyo: true,
        saupnum: true,
        youngsu: true,
        cherbang: true,
        etc34: true,
      },
      where: [{ code: ykiho }, { saupnum: saupkiho }],
    });

    return result;
  }

  async findByYkiho(ykiho: string): Promise<Cs> {
    return this.csRepository.findOne({ where: { gubun: '001', code: ykiho } });
  }

  private async getYCodesBase(whereQuery: {
    query: string;
    parameters?: ObjectLiteral;
  }): Promise<string[]> {
    const result = await this.csRepository
      .createQueryBuilder()
      .select('cs_code code')
      .where(whereQuery.query, whereQuery.parameters)
      .andWhere("(cs_lymd = '' OR cs_lymd > DATE_FORMAT(now(), '%Y%m%d'))")
      .getRawMany<{ code: string }>();

    return result?.map((cs) => cs.code);
  }

  async getYkihosByEmCode(emCode: string): Promise<string[]> {
    return await this.getYCodesBase({
      query: 'cs_emcode = :emCode',
      parameters: { emCode },
    });
  }

  async getYkihosByMyung(csMyung: string): Promise<string[]> {
    return await this.getYCodesBase({
      query: 'cs_myung LIKE :csMyung',
      parameters: { csMyung: `%${csMyung}%` },
    });
  }

  async getYkihosByJisa(jisa: string): Promise<string[]> {
    return await this.getYCodesBase({
      query: 'cs_jisa = :jisa',
      parameters: { jisa },
    });
  }

  convertCsToUser({ cs, account }: { cs: Cs; account: Account }): User {
    return {
      userId: account.userId,
      jisa: cs.jisa,
      ykiho: cs.code,
      saupkiho: cs.saupnum,
      name: cs.myung,
      ceoName: cs.daepyo,
      fitCherbang: cs.cherbang === '4',
      fitYoungsu: cs.youngsu === '4',
      admin: account.admin,
      email: account.email,
      useBNPL: cs.etc34 === '1',
    };
  }
}
