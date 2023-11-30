import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import * as dayjs from 'dayjs';

// function ToKorDate(target: any, propertyName: string) {
//   Object.defineProperty<PropertyDescriptor>(target, propertyName, {
//     get: function () {
//       // console.log('get', this[propertyName]);
//       return new Date();
//       return (
//         !this[propertyName] && dayjs(this[propertyName]).locale('ko').format()
//       );
//     },
//     set: function (value: any) {
//       console.log(propertyName);
//       this[propertyName] = new Date();
//       // this[propertyName] = dayjs(value).locale('ko').format();
//     },
//     enumerable: true,
//     configurable: true,
//   });
// }

@ArgsType()
export default class GetAdminPaymentsArgs {
  @Field()
  jisa: string;

  @Field(() => Date)
  // @ToKorDate
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
