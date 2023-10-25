import { Field, Int, ObjectType } from "@nestjs/graphql";
import Product from "src/entities/cpm/product.entity";

@ObjectType()
export default class ProductsWithPage {
  @Field(() => Int)
  page: number;

  @Field(() => Boolean)
  isLast: boolean;

  @Field(() => [Product])
  products: Product[];
}