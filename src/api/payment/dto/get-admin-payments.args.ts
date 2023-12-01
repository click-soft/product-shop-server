import { ArgsType, Field, Int } from '@nestjs/graphql';

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
