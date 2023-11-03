import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@ArgsType()
export default class LoginArgs {
  @IsNotEmpty()
  @Field(() => String)
  userId: string;
  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
