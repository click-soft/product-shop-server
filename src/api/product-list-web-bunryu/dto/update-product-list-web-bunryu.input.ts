import { CreateProductListWebBunryuInput } from './create-product-list-web-bunryu.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductListWebBunryuInput extends PartialType(CreateProductListWebBunryuInput) {
  @Field(() => Int)
  id: number;
}
