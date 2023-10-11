import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { GetGqlUser } from 'src/decorators/get-user';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../auth/types/user';
import { CheckoutResult } from './types/checkout-result';
import { CheckoutInput } from './dto/checkout.input';
import Payment from 'src/entities/cpm/payment.entity';
import CancelOrderArgs from './dto/cancel-order.args';
import { RefundOrderArgs } from './dto/refund-order.args';

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CheckoutResult)
  async checkout(
    @Args("dto") dto: CheckoutInput,
    @GetGqlUser() user: User
  ) {
    return await this.paymentService.checkout(dto, user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Payment])
  async getPaymentWithItems(@GetGqlUser() user: User) {
    return this.paymentService.getPaymentsWithItems(user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CheckoutResult)
  async cancelOrder(
    @Args() args: CancelOrderArgs) {
    return this.paymentService.cancelOrder(args.paymentId, args.paymentKey, args.cancelReason);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => Payment)
  async getOrderCompleted(@Args("orderId") orderId: string) {
    return await this.paymentService.getOrderCompleted(orderId);
  }

  @Mutation(() => CheckoutResult)
  async refundOrder(@Args() args: RefundOrderArgs) {
    return await this.paymentService.refundOrder(args);
  }
}
