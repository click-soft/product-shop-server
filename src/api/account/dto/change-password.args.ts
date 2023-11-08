import { ArgsType, Field } from '@nestjs/graphql';
import { IsPassword } from 'src/validators/password.validator';

@ArgsType()
export default class ChangePasswordArgs {
  @Field()
  userId: string;

  @IsPassword()
  @Field()
  password: string;
}
