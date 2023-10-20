import { Injectable } from '@nestjs/common';
import { ProductArgs } from './dto/product.args';
import { ProductsByBunryu } from '../product/types/products-by-bunryu';
import { ProductListService } from '../product-list/product-list.service';
import { Repository } from 'typeorm';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductListSubService {
  constructor(
    private productListService: ProductListService,
    @InjectRepository(ProductListSub)
    private productListSubRepository: Repository<ProductListSub>
  ) { }

  private getBunryu(productLists: ProductList[], smCode: string) {
    return productLists.find(pls => pls.smCode === smCode)?.bunryu;
  }

  private async getProductListSubsByList(jisa: string, productLists: ProductList[]): Promise<ProductListSub[]> {
    const smCodes = productLists.map(pl => pl.smCode);
    return await this.productListSubRepository.createQueryBuilder()
      .where("pls_jisa = :jisa AND pls_smcode IN (:smCodes)", { jisa, smCodes })
      .getMany();
  }

  async getLatestProducts(): Promise<ProductListSub[]> {
    const dataList = await this.productListSubRepository.find();

    const lastestData = dataList.reduce((acc: ProductListSub[], cur: ProductListSub) => {
      const index = acc.findIndex(p => p.smCode === cur.smCode)

      if (index === -1) {
        return acc.concat(cur);
      } else if (acc[index].smYmd < cur.smYmd) {
        acc[index] = cur;
        return acc;
      }
    }, [])
    return lastestData;
  }

  async getAll(filter: ProductArgs): Promise<ProductsByBunryu[] | undefined> {
    const productLists = await this.productListService.getProductLists(filter.jisa, filter.bunryu);

    if (productLists.length === 0) return undefined;

    const plsResult = await this.getProductListSubsByList(filter.jisa, productLists)

    const lastestPrds = plsResult.reduce((acc: ProductsByBunryu[], cur: ProductListSub) => {
      const bunryu = this.getBunryu(productLists, cur.smCode);
      const prd = acc.find(p => p.bunryu === bunryu);

      if (!prd) {
        const prd = new ProductsByBunryu();
        prd.bunryu = bunryu;
        prd.products = [Object.assign(cur)];
        acc.push(prd);
      } else {
        const findIndex = prd.products?.findIndex(p => p.smCode === cur.smCode)
        if (findIndex > -1 && prd.products[findIndex].smYmd < cur.smYmd) {
          prd.products[findIndex] = cur;
        } else {
          prd.products.push(Object.assign(cur));
        }
      }
      return acc;
    }, [])

    lastestPrds.sort((a, b) => a.bunryu.localeCompare(b.bunryu))

    return lastestPrds;
  }


  async findOneByCode(jisa: string, smCode: string, ymd: string): Promise<ProductListSub> {
    return await this.productListSubRepository.createQueryBuilder()
      .where("pls_jisa = :jisa AND pls_smcode = :smCode", { jisa, smCode })
      .andWhere("pls_smYmd <= :ymd", { ymd })
      .orderBy("pls_smymd", 'DESC')
      .getOne();
  }
}
