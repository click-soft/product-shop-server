import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export default class GetPaymentWithItemsArgs {
  @Field(() => Int)
  page: number;
}