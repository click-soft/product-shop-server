import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ValidChangePasswordArgs {
  @IsNotEmpty()
  @Field()
  userId: string;

  @IsNotEmpty()
  @Field()
  token: string;
}
