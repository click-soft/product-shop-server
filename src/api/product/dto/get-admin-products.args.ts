import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export default class GetAdminProductsArgs {
  @Field()
  startYmd: string;
  @Field()
  endYmd: string;
  @Field({ nullable: true })
  emCode: string;
  @Field({ nullable: true })
  csMyung: string;

  @Field(() => Int)
  page: number;
}