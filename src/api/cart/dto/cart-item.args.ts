import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export default class CartItemArgs {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => Int, { nullable: true })
  cartId?: number;
  @Field(() => String)
  code: string;
  @Field(() => Int)
  quantity: number;
  @Field(() => Boolean)
  fit: boolean;
  @Field(() => Date, { nullable: true })
  createdDate?: Date;
  @Field(() => Date, { nullable: true })
  updatedDate?: Date;
}
