import { Resolver } from '@nestjs/graphql';
import { ProductList } from 'src/entities/cpm/productlist.entity';

@Resolver(() => ProductList)
export class ProductListResolver {}
