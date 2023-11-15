import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class VerifyAccountArgs {
  @Field()
  userId: string;

  @Field()
  password: string;
}
