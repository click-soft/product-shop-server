import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { ProductArgs } from "./dto/product.args";
import { ProductsByBunryu } from "./types/products-by-bunryu";
import { ProductListSub } from "src/entities/cpm/productlistsub.entity";

@Resolver(() => ProductListSub)
export default class ProductResolver {
  constructor(private productService: ProductService) { }

  @Query(() => [ProductsByBunryu])
  async getProductsBunryuList(
    @Args() args: ProductArgs) {
    return await this.productService.getAll(args);
  }
}