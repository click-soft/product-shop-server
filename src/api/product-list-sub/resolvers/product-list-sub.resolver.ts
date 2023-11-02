import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { ProductListSubService } from '../services/product-list-sub.service';
import { ProductsByBunryu } from 'src/api/product/types/products-by-bunryu';
import { ProductArgs } from '../dto/product.args';

@Resolver(() => ProductListSub)
export class ProductListSubResolver {
  constructor(private readonly productListSubService: ProductListSubService) {}

  @Query(() => [ProductsByBunryu])
  async getProductsBunryuList(@Args() args: ProductArgs) {
    return await this.productListSubService.getAll(args);
  }
}
