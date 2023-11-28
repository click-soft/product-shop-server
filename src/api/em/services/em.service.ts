import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Em } from 'src/entities/cpm/em.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmService {
  constructor(
    @InjectRepository(Em)
    private emRepository: Repository<Em>,
  ) {}

  async find(emCode: string): Promise<Em> {
    return await this.emRepository.findOne({ where: { code: emCode } });
  }

  async getManagers(jisa: string): Promise<Em[]> {
    return await this.emRepository
      .createQueryBuilder()
      .where("(em_endymd = '' OR em_endymd >= DATE_FORMAT(now(), '%Y%m%d')) ")
      .andWhere('em_jisa = :jisa', { jisa })
      .andWhere("em_bucode = '400' ")
      .andWhere("em_code <> '099' ")
      .orderBy('em_code')
      .getMany();
  }
}
