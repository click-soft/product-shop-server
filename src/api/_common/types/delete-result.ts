import { Field, Int, ObjectType, Scalar } from "@nestjs/graphql";
import { AnyScalar } from "../custom-scalar/any.scalar";

@ObjectType()
export class DeleteResult {
  @Field(() => Object, { nullable: true })
  raw?: Object;
  @Field(() => Int)
  affected?: number;
}