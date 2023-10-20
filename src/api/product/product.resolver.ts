import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { DeleteResult } from "../_common/types/delete-result";
import Product from "src/entities/cpm/product.entity";
import { ResolveField } from "@nestjs/graphql";
import { Parent } from "@nestjs/graphql";
import GetAdminProductsArgs from "./dto/getAdminProducts.args";
import { CsService } from "../cs/cs.service";
import { Cs } from "src/entities/cpm/cs.entity";
import { ProductListSub } from "src/entities/cpm/productlistsub.entity";
import { ProductListSubService } from "../product-list-sub/product-list-sub.service";
import { GqlAuthGuard } from "../auth/gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { GetGqlUser } from "src/decorators/get-user";
import { User } from "../auth/types/user";

@Resolver(() => Product)
export default class ProductResolver {
  constructor(
    private productService: ProductService,
    private productListSubService: ProductListSubService,
    private csService: CsService,
  ) { }

  @Mutation(() => DeleteResult)
  async deleteProducts(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return await this.productService.delete(...ids);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => [Product])
  async getAdminProducts(@Args() args: GetAdminProductsArgs) {
    return await this.productService.find(args);    
  }

  @ResolveField(() => Cs, { nullable: true })
  async cs(@Parent() product: Product) {
    return await this.csService.findByYkiho(product.csCode);
  }

  @ResolveField(() => ProductListSub, { nullable: true })
  async productListSub(@Parent() product: Product) {

    return await this.productListSubService.findOneByCode(product.jisa, product.clCode, product.receiveYmd);
  }
}