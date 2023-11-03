import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsNumberString, Length } from 'class-validator';

@ArgsType()
export default class SaveAccountArgs {
  @Length(8, 10, { message: '아이드를 확인하세요.' })
  @IsNumberString({}, { message: '아이디는 숫자만 입력하세요.' })
  @Field()
  userId: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
