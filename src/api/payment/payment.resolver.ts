import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CancelOrderInput, CheckoutInput, CheckoutResult, PaymentType, User } from 'src/graphql';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { GetGqlUser } from 'src/decorators/get-user';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async checkout(
    @Args("dto") dto: CheckoutInput,
    @GetGqlUser() user: User
  ): Promise<CheckoutResult> {
    return await this.paymentService.checkout(dto, user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Query()
  async getPaymentWithItems(@GetGqlUser() user: User): Promise<PaymentType[]> {
    return this.paymentService.getPaymentsWithItems(user.ykiho);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation()
  async cancelOrder(
    @Args("paymentId") paymentId: number,
    @Args('paymentKey') paymentKey: string,
    @Args('cancelReason') cancelReason: string): Promise<CheckoutResult> {
    return this.paymentService.cancelOrder(paymentId, paymentKey, cancelReason);
  }

  // @UseGuards(GqlAuthGuard)
  @Query()
  async getOrderCompleted(@Args("orderId") orderId: string): Promise<PaymentType> {
    return await this.paymentService.getOrderCompleted(orderId);
  }

  @Mutation()
  async refundOrder(@Args("dto") dto: CancelOrderInput): Promise<CheckoutResult> {
    return await this.paymentService.refundOrder(dto);
  }
}
