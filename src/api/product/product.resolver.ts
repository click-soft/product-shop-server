import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductFilter, ProductsByBunryu } from "src/graphql";
import { ProductService } from "./product.service";

@Resolver()
export default class ProductResolver {
  constructor(private productService: ProductService) { }

  @Query()
  async getProductsBunryuList(
    @Args('filter') filter: ProductFilter): Promise<ProductsByBunryu[]> {
      console.log("getProductsBunryuList");
      
    return await this.productService.getAll(filter);
  }
}