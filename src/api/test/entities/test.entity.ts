import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Test {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: string;
}
