import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { ProductListSubService } from '../services/product-list-sub.service';
import { ProductsByBunryu } from 'src/api/product/types/products-by-bunryu';
import { ProductArgs } from '../dto/product.args';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { ProductListService } from 'src/api/product-list/services/product-list.service';

@Resolver(() => ProductListSub)
export class ProductListSubResolver {
  constructor(
    private readonly productListService: ProductListService,
    private readonly productListSubService: ProductListSubService,
  ) {}

  @Query(() => [ProductsByBunryu])
  async getProductsBunryuList(@Args() args: ProductArgs) {
    return await this.productListSubService.getAll(args);
  }

  @ResolveField(() => ProductList)
  async productList(@Parent() parent: ProductListSub): Promise<ProductList> {
    return await this.productListService.findOne(parent);
  }
}
