import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  jisa?: string;
  @Field(() => String)
  ykiho?: string;
  @Field(() => String)
  saupkiho?: string;
  @Field(() => String)
  name?: string;
  @Field(() => String)
  ceoName?: string;
  @Field(() => Boolean)
  fitCherbang?: boolean;
  @Field(() => Boolean)
  fitYoungsu?: boolean;
  @Field(() => Boolean, { nullable: true })
  admin?: boolean;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => Boolean, { nullable: true })
  useBNPL?: boolean;
  @Field(() => Int, { nullable: true })
  exp?: number;

  isTest?: boolean;
}
