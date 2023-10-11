import { Field, InputType, Int } from "@nestjs/graphql";
import { CheckoutCartItemInput } from "./checkout-cart-item.input";

@InputType()
export class CheckoutInput {
  @Field(() => String)
  paymentType: string;
  @Field(() => String)
  orderId: string;
  @Field(() => String)
  orderName: string;
  @Field(() => String)
  paymentKey: string;
  @Field(() => Int)
  amount: number;
  @Field(() => Int)
  quantity: number;
  @Field(() => [CheckoutCartItemInput])
  items: CheckoutCartItemInput[];
}