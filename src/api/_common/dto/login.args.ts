import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";

@ArgsType()
export default class LoginArgs {
  @Length(8,8, {message: '아이디 자리수를 확인하세요.'})
  @IsNotEmpty()
  @Field(() => String)
  userId: string;
  @IsNotEmpty()
  @Field(() => String)
  password: string;
}