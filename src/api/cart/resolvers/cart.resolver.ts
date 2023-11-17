import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetGqlUser } from 'src/decorators/get-user';
import { User } from '../../auth/types/user';
import { MessageResult } from '../../_common/types/message-result';
import CartItemArgs from '../dto/cart-item.args';
import { UpdateCartItemQuantityArgs } from '../dto/update-cart-item-quantity.args';
import { DeleteResult } from '../../_common/types/delete-result';
import { UpdateResult } from '../../_common/types/update-result';
import { CartService } from '../services/cart.service';
import { GqlAuthGuard } from 'src/api/auth/guards/gql.auth.guard';
import { Cart } from 'src/entities/cpm/cart.entity';

@Resolver(() => Cart)
export default class CartResolver {
  constructor(private cartService: CartService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Int)
  async cartItemsCount(@GetGqlUser() user: User) {
    const itemsCount = await this.cartService.getItemsCount(user.ykiho);

    return itemsCount;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Cart)
  async getCart(@GetGqlUser() user: User): Promise<Cart> {
    return await this.cartService.getCart(user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Cart, { nullable: true })
  async getCartWithProduct(@GetGqlUser() user: User) {
    return await this.cartService.getCartWithProduct(user.jisa, user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageResult)
  async addToCart(@GetGqlUser() user: User, @Args() args: CartItemArgs) {
    return await this.cartService.saveCart(user.ykiho, args);
  }
}
