import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class UpdateProductArgs {
  @Field(() => Int)
  auto: number;
  @Field({ nullable: true })
  orderCheck: string;
  @Field({ nullable: true })
  seller: string;
}