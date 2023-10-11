import { Field, ObjectType } from "@nestjs/graphql";
import { ProductListSub } from "src/entities/cpm/productlistsub.entity";

@ObjectType()
export class ProductsByBunryu {
  @Field(() => String)
  bunryu: string;
  @Field(() => [ProductListSub])
  products: ProductListSub[];
}