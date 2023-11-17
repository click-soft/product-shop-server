import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CartItem } from 'src/entities/cpm/cart-item.entity';
import { CartItemService } from '../services/cart-item.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/api/auth/guards/gql.auth.guard';
import { UpdateCartItemQuantityArgs } from 'src/api/cart/dto/update-cart-item-quantity.args';
import { UpdateResult } from 'src/api/_common/types/update-result';
import { DeleteResult } from 'src/api/_common/types/delete-result';

@Resolver(() => CartItem)
export default class CartItemResolver {
  constructor(private cartItemService: CartItemService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateResult)
  async updateCartItemQuantity(@Args() args: UpdateCartItemQuantityArgs) {
    return await this.cartItemService.updateCartItem(args.id, {
      quantity: args.quantity,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteResult)
  async deleteCartItems(@Args('ids', { type: () => [Int] }) ids: number[]) {
    return await this.cartItemService.deleteCartItems(...ids);
  }
}
