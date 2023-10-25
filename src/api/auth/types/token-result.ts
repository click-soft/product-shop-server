import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class TokenResult {
  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  usr?: string;

  @Field({ nullable: true })
  admin?: boolean;
}