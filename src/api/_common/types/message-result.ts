import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MessageResult {
  @Field(()=> String)
  message?: string;
}
