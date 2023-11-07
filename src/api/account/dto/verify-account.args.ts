import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export default class VerifyAccountArgs {
  @Field()
  userId: string
  
  @Field()
  password: string
}