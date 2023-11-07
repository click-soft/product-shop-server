import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export default class SendChangePasswordEmail {
  @IsNotEmpty()
  @Field()
  userId: string;
}
