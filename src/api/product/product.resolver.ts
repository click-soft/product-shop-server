import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { DeleteResult } from "../_common/types/delete-result";
import Product from "src/entities/cpm/product.entity";

@Resolver(() => Product)
export default class ProductResolver {
  constructor(private productService: ProductService) { }

  @Mutation(() => DeleteResult)
  async deleteProducts(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return await this.productService.delete(...ids);
  }
}