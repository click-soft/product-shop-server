import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductList } from '../../entities/cpm/productlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductListSub } from '../../entities/cpm/productlistsub.entity';
import { ProductFilter, ProductsByBunryu } from 'src/graphql';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductList)
    private productListRepository: Repository<ProductList>,
    @InjectRepository(ProductListSub)
    private productListSubRepository: Repository<ProductListSub>,
  ) { }

  private async getProductLists(jisa: string, bunryu: string): Promise<ProductList[]> {
    const plQuery = await this.productListRepository.createQueryBuilder()
      .select("pl_smcode smCode, pl_bunryu bunryu")
      .where("pl_jisa = :jisa", { jisa: jisa })
      .andWhere("pl_web = true")
      .andWhere("pl_bunryu <> ''")
    if (bunryu) {
      plQuery.andWhere("pl_bunryu = :bunryu", { bunryu: bunryu })
    };

    return await plQuery.getRawMany<ProductList>();
  }

  private async getProductListSubsByList(jisa: string, productLists: ProductList[]): Promise<ProductListSub[]> {
    const smCodes = productLists.map(pl => pl.smCode);
    return await this.productListSubRepository.createQueryBuilder()
      .where("pls_jisa = :jisa AND pls_smcode IN (:smCodes)", { jisa, smCodes })
      .getMany();
  }

  private getBunryu(productLists: ProductList[], smCode: string) {
    return productLists.find(pls => pls.smCode === smCode)?.bunryu;
  }

  async getAll(filter: ProductFilter): Promise<ProductsByBunryu[] | undefined> {
    const productLists = await this.getProductLists(filter.jisa, filter.bunryu);

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


}
