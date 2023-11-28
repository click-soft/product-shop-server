import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductListService {
  constructor(
    @InjectRepository(ProductList)
    private productListRepository: Repository<ProductList>,
  ) {}

  async getProductLists(jisa: string, bunryu: string): Promise<ProductList[]> {
    const plQuery = await this.productListRepository
      .createQueryBuilder()
      .select('pl_smcode smCode, pl_bunryu bunryu')
      .where('pl_jisa = :jisa', { jisa: jisa })
      .andWhere('pl_web = true')
      .andWhere("pl_bunryu <> ''");
    if (bunryu) {
      plQuery.andWhere('pl_bunryu = :bunryu', { bunryu: bunryu });
    }

    return await plQuery.getRawMany<ProductList>();
  }

  async findOne({ jisa, smCode }: ProductListSub): Promise<ProductList> {
    return await this.productListRepository.findOne({
      where: { jisa, smCode },
    });
  }
}
