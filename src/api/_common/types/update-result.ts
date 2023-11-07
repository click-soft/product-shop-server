import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnyScalar } from '../custom-scalar/any.scalar';

@ObjectType()
export class UpdateResult {
  @Field(() => Object, { nullable: true })
  raw?: Object;
  @Field(() => Int)
  affected?: number;
  @Field(() => Object)
  generatedMaps: Object;
}
