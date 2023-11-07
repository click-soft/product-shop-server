import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class ChangePasswordArgs {
  @Field()
  userId: string;

  @Field()
  password: string;
}
