import { Field, Int, ObjectType } from "@nestjs/graphql";
import Payment from "src/entities/cpm/payment.entity";

@ObjectType()
export default class PaymentWithPage {
  @Field(() => Int)
  page: number;

  @Field(() => Boolean)
  isLast: boolean;

  @Field(() => [Payment])
  payments: Payment[];
}