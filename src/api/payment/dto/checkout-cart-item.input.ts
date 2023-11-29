import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CheckoutCartItemInput {
  @Field(() => String)
  code: string;
  @Field(() => String)
  name: string;
  @Field(() => Boolean)
  fit: boolean;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  amount: number;
}
