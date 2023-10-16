import { Field, ArgsType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsNumberString, Length } from "class-validator";

@ArgsType()
export default class SaveAccountArgs {
  @Length(8, 8)
  @IsNumberString({}, { message: "아이디는 숫자만 입력하세요." })
  @Field()
  userId: string;

  @IsNotEmpty()
  @Field()
  password: string;
}