import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteResult } from '../../_common/types/delete-result';
import Product from 'src/entities/cpm/product.entity';
import { ResolveField } from '@nestjs/graphql';
import { Parent } from '@nestjs/graphql';
import GetAdminProductsArgs from '../dto/get-admin-products.args';
import { Cs } from 'src/entities/cpm/cs.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { UpdateProductArgs } from '../dto/update-product.args';
import ProductsWithPage from '../types/products-with-page';
import { ProductService } from '../services/product.service';
import { ProductListSubService } from 'src/api/product-list-sub/services/product-list-sub.service';
import { CsService } from 'src/api/cs/services/cs.service';

@Resolver(() => Product)
export default class ProductResolver {
  constructor(
    private productService: ProductService,
    private productListSubService: ProductListSubService,
    private csService: CsService,
  ) {}

  @Mutation(() => DeleteResult)
  async deleteProducts(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return await this.productService.delete(...ids);
  }

  @Mutation(() => Product)
  async updateProduct(@Args() args: UpdateProductArgs) {
    return await this.productService.update(args);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => ProductsWithPage)
  async getAdminProducts(@Args() args: GetAdminProductsArgs) {
    return await this.productService.find(args);
  }

  @ResolveField(() => Cs, { nullable: true })
  async cs(@Parent() product: Product) {
    return await this.csService.findByYkiho(product.csCode);
  }

  @ResolveField(() => ProductListSub, { nullable: true })
  async productListSub(@Parent() product: Product) {
    return await this.productListSubService.findOneByCode(
      product.jisa,
      product.clCode,
      product.receiveYmd,
    );
  }
}
