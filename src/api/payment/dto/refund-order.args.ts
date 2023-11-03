import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString } from 'class-validator';

@ArgsType()
export class RefundOrderArgs {
  @Field(() => Int)
  paymentId: number;
  @Field(() => String)
  cancelReason: string;
  @Field(() => String)
  bank: string;
  @IsNumberString(null, { message: '계좌번호는 숫자로만 입력해주세요.' })
  @Field(() => String)
  accountNumber: string;
  @IsNotEmpty({ message: '예금주를 입력해주세요.' })
  @Field(() => String)
  holderName: string;
}
