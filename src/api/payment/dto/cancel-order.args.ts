import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export default class CancelOrderArgs {
  @Field(() => Int)
  paymentId: number;
  @Field(() => String)
  paymentKey: string;
  @Field(() => String)
  cancelReason: string;
}
