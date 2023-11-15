import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export default class ChangeEmailArgs {
  @IsEmail()
  @Field()
  newEmail: string;
}
