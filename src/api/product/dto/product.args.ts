import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
export class ProductArgs {
  @Field(() => String)
  jisa: string;
  @Field(() => String, { nullable: true })
  bunryu?: string;
}