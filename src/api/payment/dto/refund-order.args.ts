import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class RefundOrderArgs {
  @Field(()=> Int)
  paymentId: number;
  @Field(()=> String)
  cancelReason: string;
  @Field(()=> String)
  bank: string;
  @Field(()=> String)
  accountNumber: string;
  @Field(()=> String)
  holderName: string;
}