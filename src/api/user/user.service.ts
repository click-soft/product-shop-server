import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cs } from '../../entities/cpm/cs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Cs)
    private csRepository: Repository<Cs>) { }

  async getUser({ ykiho, saupkiho }: { ykiho: string, saupkiho: string }): Promise<Cs> {
    if (ykiho && ykiho?.length !== 8) {
      throw new BadRequestException("요양기호가 올바르지 않음");
    }
    if (saupkiho && saupkiho?.length !== 10) {
      throw new BadRequestException("사업자코드가 올바르지 않음");
    }

    const result = await this.csRepository.findOne({
      select: {
        gubun: true,
        code: true,
        myung: true,
        daepyo: true,
        saupnum: true,
        youngsu: true,
        cherbang: true
      },
      where: [{ code: ykiho }, { saupnum: saupkiho }]
    })

    return result;
  }

  convertCsToUser(cs: Cs): User {
    return {
      jisa: cs.gubun,
      ykiho: cs.code,
      saupkiho: cs.saupnum,
      name: cs.myung,
      ceoName: cs.daepyo,
      fitCherbang: cs.cherbang === '4',
      fitYoungsu: cs.youngsu === "4"
    }
  }
}
