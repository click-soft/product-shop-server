import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentItemService } from './payment-item.service';
import PaymentItem from 'src/entities/cpm/payment-item.entity';

@Resolver(() => PaymentItem)
export class PaymentItemResolver {
  constructor(private readonly paymentItemService: PaymentItemService) { }

  @Mutation(() => [Int], { nullable: true })
  async getPaymentItemIdsByPaymentId(@Args("paymentId", { type: () => Int }) paymentId: number) {
    return await this.paymentItemService.getPaymentItemIdsByPaymentId(paymentId);
  }

  @Query(() => PaymentItem)
  async getPaymentItemById(@Args('id', { type: () => Int }) id: number) {
    return await this.paymentItemService.getById(id);
  }
}
