import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetGqlUser } from 'src/decorators/get-user';
import { UseGuards } from '@nestjs/common';
import Payment from 'src/entities/cpm/payment.entity';
import { PaymentService } from '../services/payment.service';
import { CsService } from 'src/api/cs/services/cs.service';
import { GqlAuthGuard } from 'src/api/auth/guards/gql.auth.guard';
import { CheckoutResult } from '../types/checkout-result';
import { CheckoutInput } from '../dto/checkout.input';
import { User } from 'src/api/auth/types/user';
import PaymentsWithPage from '../types/payments-with-page';
import GetPaymentWithItemsArgs from '../dto/get-payment-with-items.args';
import GetAdminPaymentsArgs from '../dto/get-admin-payments.args';
import CancelOrderArgs from '../dto/cancel-order.args';
import { Cs } from 'src/entities/cpm/cs.entity';
import { RefundOrderArgs } from '../dto/refund-order.args';
import CancelOrderPipe from 'src/pipes/cancel-order.pipe';
import { ProductService } from 'src/api/product/services/product.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private paymentService: PaymentService,
    private productService: ProductService,
    private csService: CsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CheckoutResult)
  async checkout(@Args('dto') dto: CheckoutInput, @GetGqlUser() user: User) {
    return await this.paymentService.checkout(dto, user.ykiho, user.isTest);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaymentsWithPage)
  async getPaymentWithItems(
    @GetGqlUser() user: User,
    @Args() args: GetPaymentWithItemsArgs,
  ) {
    return await this.paymentService.getPaymentsWithItems(user, args);
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
    @Args(CancelOrderPipe) args: CancelOrderArgs,
  ) {
    return this.paymentService.cancelOrder(
      args.paymentId,
      args.paymentKey,
      args.cancelReason,
      user.isTest,
    );
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => Payment)
  async getOrderCompleted(@Args('orderId') orderId: string) {
    return await this.paymentService.getOrderCompleted(orderId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CheckoutResult)
  async refundOrder(
    @GetGqlUser() user: User,
    @Args(CancelOrderPipe) args: RefundOrderArgs,
  ) {
    return await this.paymentService.refundOrder(args, user.isTest);
  }

  @ResolveField(() => Cs)
  async cs(@Parent() payment: Payment) {
    return await this.csService.findByYkiho(payment.ykiho);
  }
}
