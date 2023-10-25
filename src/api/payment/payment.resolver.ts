import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
import GetAdminPaymentsArgs from './dto/get-admin-payments.args';
import { Cs } from 'src/entities/cpm/cs.entity';
import { CsService } from '../cs/cs.service';
import GetPaymentWithItems from './dto/get-payment-with-items.args';
import PaymentsWithPage from './types/payments-with-page';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private paymentService: PaymentService,
    private csService: CsService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CheckoutResult)
  async checkout(
    @Args("dto") dto: CheckoutInput,
    @GetGqlUser() user: User
  ) {
    return await this.paymentService.checkout(dto, user.ykiho, user.isTest);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaymentsWithPage)
  async getPaymentWithItems(@GetGqlUser() user: User, @Args() args: GetPaymentWithItems) {
    return await this.paymentService.getPaymentsWithItems(user.ykiho, args);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => PaymentsWithPage)
  async getAdminPayments(@Args() args: GetAdminPaymentsArgs) {
    return await this.paymentService.getAdminPayments(args);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CheckoutResult)
  async cancelOrder(
    @GetGqlUser() user: User,
    @Args() args: CancelOrderArgs) {
    return this.paymentService.cancelOrder(args.paymentId, args.paymentKey, args.cancelReason, user.isTest);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => Payment)
  async getOrderCompleted(@Args("orderId") orderId: string) {
    return await this.paymentService.getOrderCompleted(orderId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CheckoutResult)
  async refundOrder(
    @GetGqlUser() user: User,
    @Args() args: RefundOrderArgs
  ) {
    return await this.paymentService.refundOrder(args, user.isTest);
  }

  @ResolveField(() => Cs)
  async cs(@Parent() payment: Payment) {
    return await this.csService.findByYkiho(payment.ykiho);
  }
}
