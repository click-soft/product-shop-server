import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaymentItemService } from './payment-item.service';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import Product from 'src/entities/cpm/product.entity';
import { ProductService } from '../product/product.service';

@Resolver(() => PaymentItem)
export class PaymentItemResolver {
  constructor(
    private readonly paymentItemService: PaymentItemService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => [Int], { nullable: true })
  async getPaymentItemIdsByPaymentId(
    @Args('paymentId', { type: () => Int }) paymentId: number,
  ) {
    return await this.paymentItemService.getPaymentItemIdsByPaymentId(
      paymentId,
    );
  }

  @Query(() => PaymentItem)
  async getPaymentItemById(@Args('id', { type: () => Int }) id: number) {
    return await this.paymentItemService.getById(id);
  }

  @ResolveField(() => Product, {nullable: true})
  async product(@Parent() pi: PaymentItem) {
    return await this.productService.getByWebPaymentItemId(pi.id);
  }
}
