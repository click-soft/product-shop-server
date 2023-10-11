import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CartService } from "./cart.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql.auth.guard";
import { GetGqlUser } from "src/decorators/get-user";
import { Cart, CartItemDto, CartResult, DeleteResult, UpdateCartItemInput, UpdateResult, User } from "src/graphql";

@Resolver()
export default class CartResolver {
  constructor(private cartService: CartService) { }

  @UseGuards(GqlAuthGuard)
  @Query()
  async cartItemsCount(@GetGqlUser() user: User): Promise<number> {
    const itemsCount = await this.cartService.getItemsCount(user.ykiho);

    return itemsCount;
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async getCart(@GetGqlUser() user: User): Promise<Cart> {
    return await this.cartService.getCart(user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async getCartWithProduct(@GetGqlUser() user: User): Promise<Cart> {
    return await this.cartService.getCartWithProduct(user.jisa, user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async addToCart(@GetGqlUser() user: User, @Args('item') item: CartItemDto): Promise<CartResult> {
    return await this.cartService.saveCart(user.ykiho, item);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async updateCartItemQuantity(@Args('input') input: UpdateCartItemInput): Promise<UpdateResult> {
    return await this.cartService.updateCartItem(input.id, { quantity: input.quantity });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async deleteCartItem(@Args('id') id: number): Promise<DeleteResult> {
    return await this.cartService.deleteCartItems(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async deleteCartItems(@Args("ids") ids: number[]): Promise<DeleteResult> {
    return await this.cartService.deleteCartItems(...ids);
  }
}