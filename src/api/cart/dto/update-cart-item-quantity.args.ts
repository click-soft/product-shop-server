import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";

@ArgsType()
export class UpdateCartItemQuantityArgs {
  @Field(()=> Int)
  id: number;

  @Field(()=> Int)
  quantity: number;
}