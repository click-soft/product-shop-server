import { Field, Int, ObjectType } from '@nestjs/graphql';
import Payment from 'src/entities/cpm/payment.entity';

@ObjectType()
export default class PaymentsWithPage {
  @Field(() => Int)
  page: number;

  @Field(() => Boolean)
  isLast: boolean;

  @Field(() => [Payment])
  payments: Payment[];
}
