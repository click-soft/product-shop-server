import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductListSubService } from './product-list-sub.service';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { ProductsByBunryu } from '../product/types/products-by-bunryu';
import { ProductArgs } from './dto/product.args';

@Resolver(() => ProductListSub)
export class ProductListSubResolver {
  constructor(private readonly productListSubService: ProductListSubService) { }

  @Query(() => [ProductsByBunryu])
  async getProductsBunryuList(
    @Args() args: ProductArgs) {
    return await this.productListSubService.getAll(args);
  }
  
}
