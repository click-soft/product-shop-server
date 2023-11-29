import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
export default class GetAdminPaymentsArgs {
  @Field()
  jisa: string;
  @Field(() => Date)
  startDate: Date;
  @Field(() => Date)
  endDate: Date;
  @Field({ nullable: true })
  emCode?: string;
  @Field({ nullable: true })
  customerName?: string;
  @Field({ nullable: true })
  orderId?: string;

  @Field(() => Int)
  page: number;
}
