import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// function ToKorDate() {
//   return function (target: any, propertyKey: string): any {
//     let value = target[propertyKey];

//     function getter() {
//       return dayjs().format();
//     }

//     function setter(newVal: any) {
//       value = newVal;
//     }

//     return {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     };
//   };
// }

@ArgsType()
export default class GetAdminPaymentsArgs {
  @Field()
  jisa: string;
  @Field(() => Date)
  @Transform(({ value }) => dayjs(value).tz('Asia/Seoul').toDate())
  startDate: Date;
  @Field(() => Date)
  @Transform(({ value }) => dayjs(value).tz('Asia/Seoul').toDate())
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
