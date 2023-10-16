import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CsType {
  @Field(()=> String)
  gubun?: string;
  @Field(()=> String)
  code?: string;
  @Field(()=> String)
  myung?: string;
  @Field(()=> String)
  daepyo?: string;
  @Field(()=> String)
  saupnum?: string;
  @Field(()=> String)
  youngsu?: string;
  @Field(()=> String)
  cherbang?: string;
}