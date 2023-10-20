import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export default class GetAdminProductsArgs {
  @Field()
  startYmd: string;
  @Field()
  endYmd: string;
  @Field({ nullable: true })
  emCode: string;
}