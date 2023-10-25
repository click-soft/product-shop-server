import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export default class GetPaymentWithItems {
  @Field(() => Int)
  page: number;
}