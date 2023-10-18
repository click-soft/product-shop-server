import { Resolver } from '@nestjs/graphql';
import { ProductListService } from './product-list.service';
import { ProductList } from 'src/entities/cpm/productlist.entity';

@Resolver(() => ProductList)
export class ProductListResolver {
  constructor(private readonly productListService: ProductListService) { }
}
