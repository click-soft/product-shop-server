import { Field, ObjectType } from '@nestjs/graphql';
import PaymentVirtual from 'src/entities/cpm/payment-virtual.entity';

@ObjectType()
export class CheckoutResult {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String, { nullable: true })
  errorCode?: string;
  @Field(() => String, { nullable: true })
  errorMessage?: string;
  @Field(() => String, { nullable: true })
  method?: string;
  @Field(() => Date, { nullable: true })
  requestedAt?: Date;
  @Field(() => Date, { nullable: true })
  approvedAt?: Date;

  orderId?: string;
  paymentKey?: string;
  totalAmount?: number;
  status?: string;

  paymentVirtual?: PaymentVirtual;
}
