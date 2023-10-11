import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export default class LoginArgs {
  @Field(()=> String, {nullable: true})
  ykiho?: string;
  @Field(()=> String, {nullable: true})
  saupkiho?: string;
}